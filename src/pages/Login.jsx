import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Chrome, Eye, EyeOff, Leaf } from "lucide-react";

export default function Login() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) {
      console.error('OAuth error:', error);
    }
    setLoading(false);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-800">Welcome Back!</CardTitle>
            <CardDescription>You are successfully logged in as {session?.user?.email}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={signOut} variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="src/assets/logo2.png" alt="ESGku Logo" className="h-16" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">
              Don't have an account? {" "}
              <button 
                onClick={() => navigate('/register')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign up now
              </button>
            </p>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                  <button 
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-green-50">
        <div className="relative w-full h-full max-w-lg">
          {/* Modern Eco Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20"></div>
              
              {/* Trees and Nature Elements */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="flex items-end space-x-4">
                  {/* Tree 1 */}
                  <div className="relative">
                    <div className="w-3 h-16 bg-green-800 rounded-sm"></div>
                    <div className="absolute -top-8 -left-4 w-10 h-16 bg-green-600 rounded-full"></div>
                  </div>
                  {/* Tree 2 */}
                  <div className="relative">
                    <div className="w-4 h-20 bg-green-800 rounded-sm"></div>
                    <div className="absolute -top-10 -left-5 w-12 h-20 bg-green-500 rounded-full"></div>
                  </div>
                  {/* Tree 3 */}
                  <div className="relative">
                    <div className="w-3 h-14 bg-green-800 rounded-sm"></div>
                    <div className="absolute -top-7 -left-4 w-10 h-14 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-16 left-16 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-24 right-20 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-32 left-12 w-5 h-5 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>

              {/* ESG Text - positioned under the trees */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-4xl font-bold text-green-800">ESG</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 