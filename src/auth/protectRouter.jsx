import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  console.log("🛡️ ProtectedRoute check:", { user: !!user, loading });

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(90deg, #5f9ea0 0%, #4a7c7e 50%, #b8926a 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div className="spinner-border text-white" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log("❌ User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  console.log("✅ User authenticated, rendering protected content");
  return children;
};