import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardDashboard from "../components/common/CardDashboard";

const Dashboard = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <CardDashboard
                        element={{
                            title: "Listado de Clientes",
                            text: "Ver Listado de clientes.",
                            link: "/clientes", variant: "primary",
                            buttonText: "Ver Clientes"
                        }}>
                    </CardDashboard>
                </Col>
                <Col md={6}>
                    <CardDashboard element={{
                        title: "Alta de Clientes",
                        text: "Crear nuevos clientes",
                        link: "/clientes/new",
                        variant: "success",
                        buttonText: "Crear Cliente"
                    }}>
                    </CardDashboard>
                </Col>
            </Row>
        </Container>
    );
}
export default Dashboard;