import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import axios from 'axios';
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
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
      });
  }, []);
  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  const currentField = formData.fields[currentFieldIndex];

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
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600 whitespace-pre-line">
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
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <div className="space-y-3">
              {currentField.properties.choices.map((choice) => (
                <label
                  key={choice.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    currentField.properties.allow_multiple_selection
                      ? (answer?.includes(choice.ref) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400')
                      : (answer === choice.ref ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400')
                  }`}
                >
                  <input
                    type={currentField.properties.allow_multiple_selection ? 'checkbox' : 'radio'}
                    name={currentField.id}
                    value={choice.ref}
                    checked={
                      currentField.properties.allow_multiple_selection
                        ? answer?.includes(choice.ref) || false
                        : answer === choice.ref
                    }
                    onChange={(e) => {
                      if (currentField.properties.allow_multiple_selection) {
                        const newAnswer = answer || [];
                        if (e.target.checked) {
                          handleAnswerChange([...newAnswer, choice.ref]);
                        } else {
                          handleAnswerChange(newAnswer.filter(ref => ref !== choice.ref));
                        }
                      } else {
                        handleAnswerChange(choice.ref);
                      }
                    }}
                    className="sr-only"
                  />
                  <span className="text-lg">{choice.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <select
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Selecione uma opção</option>
              {currentField.properties.choices.map((choice) => (
                <option key={choice.id} value={choice.ref}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'short_text':
      case 'long_text':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            {currentField.type === 'short_text' ? (
              <input
                type="text"
                value={answer || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite sua resposta aqui..."
              />
            ) : (
              <textarea
                value={answer || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows={6}
                placeholder="Digite sua resposta aqui..."
              />
            )}
          </div>
        );

      case 'number':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <input
              type="number"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              min={currentField.validations?.min_value}
              max={currentField.validations?.max_value}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Digite um número..."
            />
          </div>
        );

      case 'date':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <input
              type="date"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <input
              type="email"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>
        );

      case 'phone_number':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <input
              type="tel"
              value={answer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="(00) 00000-0000"
            />
          </div>
        );

      case 'inline_group':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">{currentField.title}</h2>
            {currentField.properties.description && (
              <p className="text-lg text-gray-600">{currentField.properties.description}</p>
            )}
            <div className="space-y-4">
              {currentField.properties.fields.map((subField) => {
                const subAnswer = answer?.[subField.ref] || '';
                return (
                  <div key={subField.id}>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      {subField.title}
                    </label>
                    {subField.type === 'email' ? (
                      <input
                        type="email"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="seu@email.com"
                      />
                    ) : subField.type === 'phone_number' ? (
                      <input
                        type="tel"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="(00) 00000-0000"
                      />
                    ) : (
                      <input
                        type="text"
                        value={subAnswer}
                        onChange={(e) => handleAnswerChange({
                          ...answer,
                          [subField.ref]: e.target.value
                        })}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">{screen.title}</h2>
        {screen.properties.description && (
          <p className="text-lg text-gray-600 whitespace-pre-line">
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
          <button
            className="mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {screen.properties.button_text}
          </button>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Progress bar */}
      {!isComplete && formData.settings.show_progress_bar && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Survey content */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {isComplete ? renderThankyouScreen() : renderField()}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {visitedFields.length > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Anterior
              </button>
            )}

            {!isComplete && (
              <button
                onClick={handleNext}
                disabled={!isCurrentFieldValid()}
                className={`ml-auto flex items-center px-6 py-3 rounded-lg transition-colors ${
                  isCurrentFieldValid()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentField?.type === 'statement' ? (
                  currentField.properties.button_text || 'Continue'
                ) : (
                  'OK'
                )}
                {currentField?.type === 'statement' ? (
                  <ChevronRight className="w-5 h-5 ml-2" />
                ) : (
                  <Check className="w-5 h-5 ml-2" />
                )}
              </button>
            )}
          </div>

          {/* Question number */}
          {!isComplete && formData.settings.show_question_number && currentField?.type !== 'statement' && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Pergunta {currentFieldIndex + 1} de {formData.fields.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeformSurvey;