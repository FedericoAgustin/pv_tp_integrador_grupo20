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
                            text: "Consultá y administrá todos los clientes registrados.",
                            link: "/clientes", variant: "primary",
                            buttonText: "Ver Clientes"
                        }}>
                    </CardDashboard>
                </Col>
                <Col md={6}>
                    <CardDashboard element={{
                        title: "Alta de Clientes",
                        text: "Registrá nuevos clientes en el sistema.",
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