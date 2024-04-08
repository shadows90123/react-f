import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../libs/Firebase";

import { Card } from "react-bootstrap";

export default function Home() {
    const [user] = useAuthState(auth);

    return (
        <Card>
            <Card.Header>หน้าหลัก</Card.Header>
            <Card.Body>{user?.email}</Card.Body>
        </Card>
    );
}
