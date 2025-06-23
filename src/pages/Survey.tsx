
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import HeaderSurvey from '@/components/HeaderSurvey';

const TypeformSurvey = () => {
  const [formData, setFormData] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedFields, setVisitedFields] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentThankyouScreen, setCurrentThankyouScreen] = useState(null);

  // Load form data on component mount
  const form_id = import.meta.env.VITE_TYPE_FROM_FORM_ID;
  const api_token = import.meta.env.VITE_TYPE_FORM_API_KEY;

  useEffect(() => {
      // Use the proxy endpoint instead of direct API call
      axios.get(`/api/typeform/forms/${form_id}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${api_token}`
          }
      })
          .then(response => {
          setFormData(response.data);
      })
      .catch(error => {
          console.error(error);
      });
  }, []);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-primary">Loading survey...</p>
        </div>
      </div>
    );
  }

  const currentField = formData.fields[currentFieldIndex];
  console.log(currentField);
  
  // Get the next field based on logic rules
  const getNextField = () => {
    if (!currentField) return null;

    // Check logic rules for current field
    const logicRule = formData.logic.find(rule => rule.ref === currentField.ref);
    
    if (logicRule && logicRule.actions) {
      const currentAnswer = answers[currentField.ref];
      
      for (const action of logicRule.actions) {
        if (action.action === 'jump') {
          // Check if condition is met
          if (action.condition.op === 'always') {
            return action.details.to;
          } else if (action.condition.op === 'is') {
            const fieldValue = action.condition.vars[0].value;
            const choiceValue = action.condition.vars[1].value;
            
            if (currentAnswer === choiceValue || 
                (Array.isArray(currentAnswer) && currentAnswer.includes(choiceValue))) {
              return action.details.to;
            }
          } else if (action.condition.op === 'or') {
            for (const orCondition of action.condition.vars) {
              if (orCondition.op === 'is') {
                const choiceValue = orCondition.vars[1].value;
                if (currentAnswer === choiceValue || 
                    (Array.isArray(currentAnswer) && currentAnswer.includes(choiceValue))) {
                  return action.details.to;
                }
              }
            }
          }
        }
      }
    }

    // Default to next field in sequence
    if (currentFieldIndex < formData.fields.length - 1) {
      return {
        type: 'field',
        value: formData.fields[currentFieldIndex + 1].ref
      };
    }

    // If no more fields, go to default thank you screen
    return {
      type: 'thankyou',
      value: 'default_tys'
    };
  };

  const handleNext = () => {
    // Save current field to visited
    if (currentField && !visitedFields.includes(currentFieldIndex)) {
      setVisitedFields([...visitedFields, currentFieldIndex]);
    }

    const nextDestination = getNextField();
    
    if (!nextDestination) {
      setIsComplete(true);
      return;
    }

    if (nextDestination.type === 'thankyou') {
      const thankyouScreen = formData.thankyou_screens.find(
        screen => screen.ref === nextDestination.value
      );
      setCurrentThankyouScreen(thankyouScreen);
      setIsComplete(true);
    } else if (nextDestination.type === 'field') {
      const nextFieldIndex = formData.fields.findIndex(
        field => field.ref === nextDestination.value
      );
      if (nextFieldIndex !== -1) {
        setCurrentFieldIndex(nextFieldIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (visitedFields.length > 0) {
      const previousIndex = visitedFields[visitedFields.length - 1];
      setCurrentFieldIndex(previousIndex);
      setVisitedFields(visitedFields.slice(0, -1));
      setIsComplete(false);
      setCurrentThankyouScreen(null);
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentField.ref]: value
    });
  };

  const renderField = () => {
    if (!currentField) return null;

    const answer = answers[currentField.ref];

    switch (currentField.type) {
      case 'statement':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary whitespace-pre-line leading-relaxed">
                {currentField.properties.description}
              </p>
            )}
            {currentField.attachment && currentField.attachment.type === 'image' && (
              <img 
                src={currentField.attachment.href} 
                alt={currentField.attachment.properties?.description || 'Image'}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <div className="space-y-3">
              {currentField.properties.allow_multiple_selection ? (
                // Checkbox for multiple selection
                currentField.properties.choices.map((choice) => (
                  <div
                    key={choice.id}
                    className={`flex items-start space-x-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      answer?.includes(choice.ref) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => {
                      const newAnswer = answer || [];
                      if (newAnswer.includes(choice.ref)) {
                        handleAnswerChange(newAnswer.filter(ref => ref !== choice.ref));
                      } else {
                        handleAnswerChange([...newAnswer, choice.ref]);
                      }
                    }}
                  >
                    <Checkbox
                      checked={answer?.includes(choice.ref) || false}
                      onCheckedChange={() => {
                        const newAnswer = answer || [];
                        if (newAnswer.includes(choice.ref)) {
                          handleAnswerChange(newAnswer.filter(ref => ref !== choice.ref));
                        } else {
                          handleAnswerChange([...newAnswer, choice.ref]);
                        }
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-primary font-medium">{choice.label}</p>
                      {choice.properties?.description && (
                        <p className="text-sm text-primary mt-1">{choice.properties.description}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                // Radio for single selection
                <RadioGroup
                  value={answer || ''}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentField.properties.choices.map((choice) => (
                    <div
                      key={choice.id}
                      className={`flex items-start space-x-4 p-4 border rounded-lg cursor-pointer transition-all ${
                        answer === choice.ref 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleAnswerChange(choice.ref)}
                    >
                      <RadioGroupItem value={choice.ref} id={choice.id} className="mt-1" />
                      <Label htmlFor={choice.id} className="flex-1 cursor-pointer">
                        <p className="text-primary font-medium">{choice.label}</p>
                        {choice.properties?.description && (
                          <p className="text-sm text-primary mt-1">{choice.properties.description}</p>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Select value={answer || ''} onValueChange={handleAnswerChange}>
              <SelectTrigger className="w-full h-14 text-base border-gray-200">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {currentField.properties.choices.map((choice) => (
                  <SelectItem key={choice.id} value={choice.ref} className='text-primary'>
                    {choice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'short_text':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Input
              type="text"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="h-14 text-base border-gray-200 "
              placeholder="Digite sua resposta aqui..."
            />
          </div>
        );

      case 'long_text':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Textarea
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-32 text-base border-gray-200 "
              placeholder="Digite sua resposta aqui..."
            />
          </div>
        );

      case 'number':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Input
              type="number"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              min={currentField.validations?.min_value}
              max={currentField.validations?.max_value}
              className="h-14 text-base border-gray-200 "
              placeholder="Digite um número..."
            />
          </div>
        );

      case 'date':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <div className="relative">
              <Input
                type="date"
                value={answer || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="h-14 text-base border-gray-200 w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-4 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 pl-12"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Input
              type="email"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="h-14 text-base border-gray-200 "
              placeholder="seu@email.com"
            />
          </div>
        );

      case 'phone_number':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <Input
              type="tel"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="h-14 text-base border-gray-200 "
              placeholder="(00) 00000-0000"
            />
          </div>
        );

      case 'inline_group':
        return (
          <div className="space-y-6 text-primary">
            <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{currentField.title}</h1>
            {currentField.properties.description && (
              <p className="text-lg text-primary leading-relaxed">{currentField.properties.description}</p>
            )}
            <div className="space-y-6 text-primary">
              {currentField.properties.fields.map((subField) => {
                const subAnswer = answer?.[subField.ref] || '';
                return (
                  <div key={subField.id}>
                    <Label className="text-lg font-medium text-gray-700 mb-3 block">
                      {subField.title}
                    </Label>
                    {subField.type === 'email' ? (
                      <Input
                        type="email"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="h-14 text-base border-gray-200 "
                        placeholder="seu@email.com"
                      />
                    ) : subField.type === 'phone_number' ? (
                      <Input
                        type="tel"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="h-14 text-base border-gray-200 "
                        placeholder="(00) 00000-0000"
                      />
                    ) : (
                      <Input
                        type="text"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="h-14 text-base border-gray-200 "
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return <div>Unsupported field type: {currentField.type}</div>;
    }
  };

  const renderThankyouScreen = () => {
    const screen = currentThankyouScreen || formData.thankyou_screens.find(s => s.ref === 'default_tys');
    
    return (
      <div className="space-y-6 text-primary text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{screen.title}</h1>
        {screen.properties.description && (
          <p className="text-lg text-gray-600 whitespace-pre-line leading-relaxed">
            {screen.properties.description}
          </p>
        )}
        {screen.attachment && screen.attachment.type === 'image' && (
          <img 
            src={screen.attachment.href} 
            alt="Thank you"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        )}
        {screen.properties.show_button && (
          <Button className="mt-8 h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition-colors">
            {screen.properties.button_text}
          </Button>
        )}
      </div>
    );
  };

  const isCurrentFieldValid = () => {
    if (!currentField) return true;
    
    const answer = answers[currentField.ref];
    const isRequired = currentField.validations?.required;
    
    if (!isRequired) return true;
    
    if (currentField.type === 'statement') return true;
    
    if (currentField.type === 'inline_group') {
      return currentField.properties.fields.every(subField => {
        const subAnswer = answer?.[subField.ref];
        return !subField.validations?.required || (subAnswer && subAnswer.length > 0);
      });
    }
    
    if (currentField.properties?.allow_multiple_selection) {
      return answer && answer.length > 0;
    }
    
    return answer !== undefined && answer !== null && answer !== '' && answer.length > 0;
  };

  const progress = ((currentFieldIndex + 1) / formData.fields.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSurvey/>
      {/* Progress bar */}
      {!isComplete && formData.settings.show_progress_bar && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-2xl mt-16">
        <div className="pt-4">
          {/* Survey content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            {isComplete ? renderThankyouScreen() : renderField()}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between items-center">
            {visitedFields.length > 0 && (
              <Button
                onClick={handlePrevious}
                variant="ghost"
                className="flex items-center text-gray-600 hover:text-gray-800 h-12 px-4"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Anterior
              </Button>
            )}

            {!isComplete && (
              <Button
                onClick={handleNext}
                disabled={!isCurrentFieldValid()}
                className={`ml-auto h-14 px-8 rounded-lg text-lg font-semibold transition-colors ${
                  isCurrentFieldValid()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                }`}
              >
                {currentField?.type === 'statement' ? (
                  <>
                    {currentField.properties.button_text || 'Continuar'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Continuar
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Question number */}
          {!isComplete && formData.settings.show_question_number && currentField?.type !== 'statement' && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Pergunta {currentFieldIndex + 1} de {formData.fields.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeformSurvey;
