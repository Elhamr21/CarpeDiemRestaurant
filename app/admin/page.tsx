"use client";

import { useEffect, useState } from "react";
import { confirmSignIn, getCurrentUser, signIn, signOut } from "aws-amplify/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ensureAmplifyConfigured, getAmplifyErrorMessage } from "@/lib/amplify";

export default function AdminLogin() {
  const [needsNewPassword, setNeedsNewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const checkCurrentSession = async () => {
      try {
        await ensureAmplifyConfigured();
      } catch (configError) {
        if (!cancelled) {
          setError(getAmplifyErrorMessage(configError));
        }
        return;
      }

      try {
        await getCurrentUser();
        if (!cancelled) {
          window.location.href = "/admin/dashboard";
        }
      } catch {
        // User is not signed in yet.
      }
    };

    void checkCurrentSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await ensureAmplifyConfigured();
      await signOut();
      setError("");
    } catch (signOutError) {
      setError(getAmplifyErrorMessage(signOutError));
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await ensureAmplifyConfigured();
      const result = await signIn({ username: email, password });

      if (
        result.nextStep?.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setNeedsNewPassword(true);
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch (signInError) {
      setError(getAmplifyErrorMessage(signInError));
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwörter stimmen nicht überein.");
      setLoading(false);
      return;
    }

    try {
      await ensureAmplifyConfigured();
      const result = await confirmSignIn({ challengeResponse: newPassword });

      if (result.isSignedIn) {
        window.location.href = "/admin/dashboard";
      }
    } catch (passwordError) {
      setError(getAmplifyErrorMessage(passwordError));
    } finally {
      setLoading(false);
    }
  };

  if (needsNewPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Neues Passwort festlegen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Sie müssen ein neues Passwort festlegen, um fortzufahren.
            </p>
            <form onSubmit={handleNewPassword} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Neues Passwort</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Passwort bestätigen</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Wird gespeichert..." : "Passwort speichern"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Anmeldung</CardTitle>
        </CardHeader>
        <CardContent>
          {error === "There is already a signed in user." && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800 mb-2">
                Sie sind bereits angemeldet.
              </p>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Abmelden
              </Button>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Wird geladen..." : "Anmelden"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
