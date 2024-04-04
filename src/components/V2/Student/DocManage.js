import Card from "react-bootstrap/Card";

export default function DocManage({ children }) {
    return (
        <Card body className="mb-2">
            <Card.Subtitle className="mb-2 text-muted">
                เครื่องมือ
            </Card.Subtitle>
            {children}
        </Card>
    );
}
