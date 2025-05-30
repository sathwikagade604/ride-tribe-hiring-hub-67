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
      attendance: {
        Row: {
          created_at: string
          date: string
          faculty_id: string
          id: string
          status: string
          student_id: string
          subject_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          faculty_id: string
          id?: string
          status: string
          student_id: string
          subject_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          faculty_id?: string
          id?: string
          status?: string
          student_id?: string
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_documents: {
        Row: {
          document_type: string
          document_url: string
          driver_id: string
          id: string
          uploaded_at: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
        }
        Insert: {
          document_type: string
          document_url: string
          driver_id: string
          id?: string
          uploaded_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Update: {
          document_type?: string
          document_url?: string
          driver_id?: string
          id?: string
          uploaded_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_documents_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_profiles: {
        Row: {
          aadhar_number: string | null
          background_check_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          created_at: string | null
          current_latitude: number | null
          current_location: unknown | null
          current_longitude: number | null
          earnings_month: number | null
          earnings_today: number | null
          earnings_week: number | null
          emergency_contact: string | null
          id: string
          insurance_expiry: string | null
          insurance_number: string | null
          is_online: boolean | null
          is_verified: boolean | null
          license_expiry: string | null
          license_number: string
          pan_number: string | null
          phone_number: string | null
          rating: number | null
          total_rides: number | null
          updated_at: string | null
          user_id: string | null
          vehicle_color: string | null
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_number: string | null
          vehicle_registration: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year: number | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          aadhar_number?: string | null
          background_check_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          created_at?: string | null
          current_latitude?: number | null
          current_location?: unknown | null
          current_longitude?: number | null
          earnings_month?: number | null
          earnings_today?: number | null
          earnings_week?: number | null
          emergency_contact?: string | null
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          is_online?: boolean | null
          is_verified?: boolean | null
          license_expiry?: string | null
          license_number: string
          pan_number?: string | null
          phone_number?: string | null
          rating?: number | null
          total_rides?: number | null
          updated_at?: string | null
          user_id?: string | null
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_number?: string | null
          vehicle_registration?: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year?: number | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          aadhar_number?: string | null
          background_check_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          created_at?: string | null
          current_latitude?: number | null
          current_location?: unknown | null
          current_longitude?: number | null
          earnings_month?: number | null
          earnings_today?: number | null
          earnings_week?: number | null
          emergency_contact?: string | null
          id?: string
          insurance_expiry?: string | null
          insurance_number?: string | null
          is_online?: boolean | null
          is_verified?: boolean | null
          license_expiry?: string | null
          license_number?: string
          pan_number?: string | null
          phone_number?: string | null
          rating?: number | null
          total_rides?: number | null
          updated_at?: string | null
          user_id?: string | null
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_number?: string | null
          vehicle_registration?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          vehicle_year?: number | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone_number: string
          relationship: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone_number: string
          relationship?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone_number?: string
          relationship?: string | null
          user_id?: string
        }
        Relationships: []
      }
      faculty: {
        Row: {
          created_at: string
          department: string
          designation: string
          employee_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department: string
          designation: string
          employee_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string
          designation?: string
          employee_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          ride_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          ride_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          ride_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      ride_requests: {
        Row: {
          driver_id: string | null
          id: string
          responded_at: string | null
          ride_id: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          driver_id?: string | null
          id?: string
          responded_at?: string | null
          ride_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          driver_id?: string | null
          id?: string
          responded_at?: string | null
          ride_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ride_requests_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_requests_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_tracking: {
        Row: {
          created_at: string | null
          distance_to_pickup: number | null
          driver_latitude: number | null
          driver_longitude: number | null
          estimated_arrival_time: number | null
          id: string
          ride_id: string
        }
        Insert: {
          created_at?: string | null
          distance_to_pickup?: number | null
          driver_latitude?: number | null
          driver_longitude?: number | null
          estimated_arrival_time?: number | null
          id?: string
          ride_id: string
        }
        Update: {
          created_at?: string | null
          distance_to_pickup?: number | null
          driver_latitude?: number | null
          driver_longitude?: number | null
          estimated_arrival_time?: number | null
          id?: string
          ride_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_tracking_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_profiles: {
        Row: {
          average_rating: number | null
          created_at: string | null
          emergency_contact: string | null
          id: string
          phone_number: string | null
          preferred_payment_method:
            | Database["public"]["Enums"]["payment_method"]
            | null
          total_rides: number | null
          updated_at: string | null
          user_id: string
          wallet_balance: number | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          phone_number?: string | null
          preferred_payment_method?:
            | Database["public"]["Enums"]["payment_method"]
            | null
          total_rides?: number | null
          updated_at?: string | null
          user_id: string
          wallet_balance?: number | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          phone_number?: string | null
          preferred_payment_method?:
            | Database["public"]["Enums"]["payment_method"]
            | null
          total_rides?: number | null
          updated_at?: string | null
          user_id?: string
          wallet_balance?: number | null
        }
        Relationships: []
      }
      rides: {
        Row: {
          accepted_at: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          completed_at: string | null
          destination_address: string
          destination_latitude: number | null
          destination_location: unknown
          destination_longitude: number | null
          distance_km: number | null
          driver_feedback: string | null
          driver_id: string | null
          driver_rating: number | null
          duration_minutes: number | null
          fare: number | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          pickup_address: string
          pickup_latitude: number | null
          pickup_location: unknown
          pickup_longitude: number | null
          requested_at: string | null
          rider_feedback: string | null
          rider_id: string | null
          rider_rating: number | null
          scheduled_time: string | null
          special_requests: string[] | null
          started_at: string | null
          status: Database["public"]["Enums"]["ride_status"] | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Insert: {
          accepted_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          destination_address: string
          destination_latitude?: number | null
          destination_location: unknown
          destination_longitude?: number | null
          distance_km?: number | null
          driver_feedback?: string | null
          driver_id?: string | null
          driver_rating?: number | null
          duration_minutes?: number | null
          fare?: number | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address: string
          pickup_latitude?: number | null
          pickup_location: unknown
          pickup_longitude?: number | null
          requested_at?: string | null
          rider_feedback?: string | null
          rider_id?: string | null
          rider_rating?: number | null
          scheduled_time?: string | null
          special_requests?: string[] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Update: {
          accepted_at?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          destination_address?: string
          destination_latitude?: number | null
          destination_location?: unknown
          destination_longitude?: number | null
          distance_km?: number | null
          driver_feedback?: string | null
          driver_id?: string | null
          driver_rating?: number | null
          duration_minutes?: number | null
          fare?: number | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          pickup_address?: string
          pickup_latitude?: number | null
          pickup_location?: unknown
          pickup_longitude?: number | null
          requested_at?: string | null
          rider_feedback?: string | null
          rider_id?: string | null
          rider_rating?: number | null
          scheduled_time?: string | null
          special_requests?: string[] | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
        }
        Relationships: [
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          academic_year: string
          branch: string
          created_at: string
          id: string
          roll_number: string
          semester: string
          updated_at: string
          user_id: string
        }
        Insert: {
          academic_year: string
          branch: string
          created_at?: string
          id?: string
          roll_number: string
          semester: string
          updated_at?: string
          user_id: string
        }
        Update: {
          academic_year?: string
          branch?: string
          created_at?: string
          id?: string
          roll_number?: string
          semester?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          credits: number | null
          department: string
          id: string
          name: string
          semester: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          credits?: number | null
          department: string
          id?: string
          name: string
          semester: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          credits?: number | null
          department?: string
          id?: string
          name?: string
          semester?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: {
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      remove_user_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
      update_auth_settings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "driver" | "rider"
      payment_method: "cash" | "card" | "wallet" | "upi"
      ride_status:
        | "requested"
        | "accepted"
        | "driver_arriving"
        | "in_progress"
        | "completed"
        | "cancelled"
      vehicle_type: "bike" | "auto" | "mini" | "sedan" | "suv" | "luxury"
      verification_status: "pending" | "verified" | "rejected"
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
      app_role: ["admin", "driver", "rider"],
      payment_method: ["cash", "card", "wallet", "upi"],
      ride_status: [
        "requested",
        "accepted",
        "driver_arriving",
        "in_progress",
        "completed",
        "cancelled",
      ],
      vehicle_type: ["bike", "auto", "mini", "sedan", "suv", "luxury"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
