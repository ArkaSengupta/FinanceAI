import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useAuth } from "../context/AuthContext";
import { pageMetaTitle } from "../components/common/pageMetaVars";

interface UserProfile {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
  };
  bio: string;
  role: string;
  client: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

interface EditForm {
  bio: string;
  role: string;
  client: string;
}

export default function UserProfiles() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    bio: "",
    role: "",
    client: "",
  });

  const API_BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setEditForm({
          bio: data.bio || "",
          role: data.role || "",
          client: data.client || "",
        });
      } else {
        setError("Failed to fetch profile");
      }
    } catch (err) {
      setError("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProfile}
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={pageMetaTitle}
        description="Manage your user profile and account settings"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard user={user} />
        </div>
      </div>
    </>
  );
}
