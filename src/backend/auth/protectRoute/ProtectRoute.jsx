// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // return <div className="text-center text-danger">Loading...</div>; // Or any loading spinner/component
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
