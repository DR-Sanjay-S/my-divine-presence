export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          date: string | null
          id: string
          location: string | null
          name: string
          notes: string | null
          organizer: string | null
          registration_link: string | null
          type: Database["public"]["Enums"]["event_type"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          organizer?: string | null
          registration_link?: string | null
          type?: Database["public"]["Enums"]["event_type"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          organizer?: string | null
          registration_link?: string | null
          type?: Database["public"]["Enums"]["event_type"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          challenges: string | null
          created_at: string
          entry_date: string
          id: string
          ideas: string | null
          lessons: string | null
          mood: Database["public"]["Enums"]["mood_level"] | null
          updated_at: string
          user_id: string
          wins: string | null
        }
        Insert: {
          challenges?: string | null
          created_at?: string
          entry_date?: string
          id?: string
          ideas?: string | null
          lessons?: string | null
          mood?: Database["public"]["Enums"]["mood_level"] | null
          updated_at?: string
          user_id: string
          wins?: string | null
        }
        Update: {
          challenges?: string | null
          created_at?: string
          entry_date?: string
          id?: string
          ideas?: string | null
          lessons?: string | null
          mood?: Database["public"]["Enums"]["mood_level"] | null
          updated_at?: string
          user_id?: string
          wins?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          linked_organizations: string[] | null
          linked_people: string[] | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          linked_organizations?: string[] | null
          linked_people?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          linked_organizations?: string[] | null
          linked_people?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          created_at: string
          expected_date: string | null
          id: string
          notes: string | null
          organization_id: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          status: Database["public"]["Enums"]["opportunity_status"]
          title: string
          type: Database["public"]["Enums"]["opportunity_type"] | null
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          created_at?: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["opportunity_status"]
          title: string
          type?: Database["public"]["Enums"]["opportunity_type"] | null
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          created_at?: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["opportunity_status"]
          title?: string
          type?: Database["public"]["Enums"]["opportunity_type"] | null
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          description: string | null
          founder: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          notes: string | null
          type: Database["public"]["Enums"]["org_type"] | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          founder?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          notes?: string | null
          type?: Database["public"]["Enums"]["org_type"] | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          founder?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          type?: Database["public"]["Enums"]["org_type"] | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      people: {
        Row: {
          category: Database["public"]["Enums"]["person_category"] | null
          company: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          id: string
          linkedin: string | null
          location: string | null
          name: string
          notes: string | null
          organization_id: string | null
          phone: string | null
          photo_url: string | null
          role: string | null
          status: Database["public"]["Enums"]["person_status"] | null
          tags: string[] | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["person_category"] | null
          company?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          name: string
          notes?: string | null
          organization_id?: string | null
          phone?: string | null
          photo_url?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["person_status"] | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["person_category"] | null
          company?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          organization_id?: string | null
          phone?: string | null
          photo_url?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["person_status"] | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      podcasts: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          notes: string | null
          organization: string | null
          person_id: string | null
          publishing_date: string | null
          recording_date: string | null
          status: Database["public"]["Enums"]["podcast_status"]
          topics: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          notes?: string | null
          organization?: string | null
          person_id?: string | null
          publishing_date?: string | null
          recording_date?: string | null
          status?: Database["public"]["Enums"]["podcast_status"]
          topics?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          notes?: string | null
          organization?: string | null
          person_id?: string | null
          publishing_date?: string | null
          recording_date?: string | null
          status?: Database["public"]["Enums"]["podcast_status"]
          topics?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "podcasts_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      relationships: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          person_id: string
          relationship_label: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          person_id: string
          relationship_label?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          person_id?: string
          relationship_label?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationships_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          user_id?: string
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
      event_type:
        | "Founder Meetup"
        | "Investor Meetup"
        | "Networking"
        | "College Event"
        | "Workshop"
        | "Podcast"
      mood_level: "Great" | "Good" | "Okay" | "Low" | "Bad"
      opportunity_status:
        | "Idea"
        | "Contacted"
        | "Discussion"
        | "Active"
        | "Won"
        | "Lost"
        | "On Hold"
      opportunity_type:
        | "Partnership"
        | "College Collaboration"
        | "Internship"
        | "Sponsorship"
        | "Podcast Guest"
        | "Investor Lead"
        | "Speaking Opportunity"
      org_type:
        | "Startup"
        | "Company"
        | "NGO"
        | "College"
        | "Government"
        | "Community"
      person_category:
        | "Founder"
        | "Investor"
        | "Professor"
        | "Student"
        | "Mentor"
        | "Trainer"
        | "Professional"
      person_status:
        | "Contacted"
        | "Connected"
        | "Meeting Scheduled"
        | "Collaborating"
        | "Partner"
        | "Mentor"
        | "Friend"
      podcast_status:
        | "Idea"
        | "Contacted"
        | "Replied"
        | "Scheduled"
        | "Recorded"
        | "Published"
      priority_level: "Low" | "Medium" | "High"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_type: [
        "Founder Meetup",
        "Investor Meetup",
        "Networking",
        "College Event",
        "Workshop",
        "Podcast",
      ],
      mood_level: ["Great", "Good", "Okay", "Low", "Bad"],
      opportunity_status: [
        "Idea",
        "Contacted",
        "Discussion",
        "Active",
        "Won",
        "Lost",
        "On Hold",
      ],
      opportunity_type: [
        "Partnership",
        "College Collaboration",
        "Internship",
        "Sponsorship",
        "Podcast Guest",
        "Investor Lead",
        "Speaking Opportunity",
      ],
      org_type: [
        "Startup",
        "Company",
        "NGO",
        "College",
        "Government",
        "Community",
      ],
      person_category: [
        "Founder",
        "Investor",
        "Professor",
        "Student",
        "Mentor",
        "Trainer",
        "Professional",
      ],
      person_status: [
        "Contacted",
        "Connected",
        "Meeting Scheduled",
        "Collaborating",
        "Partner",
        "Mentor",
        "Friend",
      ],
      podcast_status: [
        "Idea",
        "Contacted",
        "Replied",
        "Scheduled",
        "Recorded",
        "Published",
      ],
      priority_level: ["Low", "Medium", "High"],
    },
  },
} as const
