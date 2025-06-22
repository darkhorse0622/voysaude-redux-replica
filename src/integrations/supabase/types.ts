export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      credits: {
        Row: {
          amount: number
          created_at: string
          expires_at: string | null
          id: string
          updated_at: string
          used: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string | null
          id: string
          updated_at: string
          used?: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
          used?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mockups: {
        Row: {
          created_at: string
          credit_id: string | null
          error_message: string | null
          id: string
          logo_color: string | null
          logo_image_url: string
          logo_rotation: number
          logo_scale: number
          marking_technique: Database["public"]["Enums"]["MarkingTechnique"]
          marking_zone_h: number
          marking_zone_w: number
          marking_zone_x: number
          marking_zone_y: number
          name: string | null
          processing_time: number | null
          product_id: string | null
          product_image_url: string
          result_image_url: string | null
          status: Database["public"]["Enums"]["MockupStatus"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credit_id?: string | null
          error_message?: string | null
          id: string
          logo_color?: string | null
          logo_image_url: string
          logo_rotation?: number
          logo_scale?: number
          marking_technique: Database["public"]["Enums"]["MarkingTechnique"]
          marking_zone_h: number
          marking_zone_w: number
          marking_zone_x: number
          marking_zone_y: number
          name?: string | null
          processing_time?: number | null
          product_id?: string | null
          product_image_url: string
          result_image_url?: string | null
          status?: Database["public"]["Enums"]["MockupStatus"]
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          credit_id?: string | null
          error_message?: string | null
          id?: string
          logo_color?: string | null
          logo_image_url?: string
          logo_rotation?: number
          logo_scale?: number
          marking_technique?: Database["public"]["Enums"]["MarkingTechnique"]
          marking_zone_h?: number
          marking_zone_w?: number
          marking_zone_x?: number
          marking_zone_y?: number
          name?: string | null
          processing_time?: number | null
          product_id?: string | null
          product_image_url?: string
          result_image_url?: string | null
          status?: Database["public"]["Enums"]["MockupStatus"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mockups_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mockups_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mockups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: Database["public"]["Enums"]["PaymentStatus"]
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id: string
          payment_method?: string | null
          status?: Database["public"]["Enums"]["PaymentStatus"]
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: Database["public"]["Enums"]["PaymentStatus"]
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id: string
          image_url: string
          is_active?: boolean
          name: string
          updated_at: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan: Database["public"]["Enums"]["SubscriptionPlan"]
          status: Database["public"]["Enums"]["SubscriptionStatus"]
          stripe_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start: string
          id: string
          plan: Database["public"]["Enums"]["SubscriptionPlan"]
          status?: Database["public"]["Enums"]["SubscriptionStatus"]
          stripe_id?: string | null
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan?: Database["public"]["Enums"]["SubscriptionPlan"]
          status?: Database["public"]["Enums"]["SubscriptionStatus"]
          stripe_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_login: string | null
          last_name: string | null
          password_hash: string
          role: Database["public"]["Enums"]["UserRole"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          is_active?: boolean
          last_login?: string | null
          last_name?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["UserRole"]
          updated_at: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          last_name?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["UserRole"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      MarkingTechnique:
        | "SERIGRAFIA"
        | "TRANSFER_DIGITAL"
        | "VINILO_TEXTIL"
        | "TRANSFER_SERIGRAFICO"
        | "BORDADO"
        | "IMPRESION_DIGITAL"
        | "DOMING"
        | "TAMPOGRAFIA"
        | "GRABADO_LASER"
        | "SUBLIMACION"
        | "TERMOGRABADO"
        | "ETIQUETA_DIGITAL"
        | "VINILO_ADHESIVO"
        | "TRANSFER_CERAMICO"
        | "MOLDE_3D"
        | "GRABADO_FUEGO"
        | "GRABADO_UV"
        | "GRABADO_RELIEVE"
        | "SERIGRAFIA_CIRCULAR"
      MockupStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
      PaymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
      SubscriptionPlan: "BASIC" | "PRO" | "PREMIUM"
      SubscriptionStatus: "ACTIVE" | "INACTIVE" | "CANCELLED" | "EXPIRED"
      UserRole: "VISITOR" | "REGISTERED" | "SUBSCRIBED" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      MarkingTechnique: [
        "SERIGRAFIA",
        "TRANSFER_DIGITAL",
        "VINILO_TEXTIL",
        "TRANSFER_SERIGRAFICO",
        "BORDADO",
        "IMPRESION_DIGITAL",
        "DOMING",
        "TAMPOGRAFIA",
        "GRABADO_LASER",
        "SUBLIMACION",
        "TERMOGRABADO",
        "ETIQUETA_DIGITAL",
        "VINILO_ADHESIVO",
        "TRANSFER_CERAMICO",
        "MOLDE_3D",
        "GRABADO_FUEGO",
        "GRABADO_UV",
        "GRABADO_RELIEVE",
        "SERIGRAFIA_CIRCULAR",
      ],
      MockupStatus: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
      PaymentStatus: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      SubscriptionPlan: ["BASIC", "PRO", "PREMIUM"],
      SubscriptionStatus: ["ACTIVE", "INACTIVE", "CANCELLED", "EXPIRED"],
      UserRole: ["VISITOR", "REGISTERED", "SUBSCRIBED", "ADMIN"],
    },
  },
} as const
