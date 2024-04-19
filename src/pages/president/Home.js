import _ from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserData } from "../../hooks/useUserData";
import { auth } from "../../libs/Firebase";

import { Card, ListGroup } from "react-bootstrap";

import FormUser from "../../components/V2/Form/User";

export default function Home() {
    const [user] = useAuthState(auth);
    const [userData] = useUserData();

    return (
        <Card>
            <Card.Header>หน้าหลัก</Card.Header>
            <Card.Body>
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>{userData.name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                อีเมล: {userData.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                เบอร์: {userData.tel}
                            </ListGroup.Item>
                        </ListGroup>
                        <FormUser
                            userData={{ [user?.uid]: userData }}
                            type="edit"
                            onReloadPage={() => {
                                window.location.reload();
                            }}
                        />
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    );
}
