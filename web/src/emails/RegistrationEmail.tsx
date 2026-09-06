import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface RegistrationEmailProps {
  nombre: string;
  ticketType: string;
}

export const RegistrationEmail = ({
  nombre,
  ticketType,
}: RegistrationEmailProps) => {
  const getTicketName = (type: string) => {
    switch (type) {
      case 'congreso': return 'Pase Congreso';
      case 'vip': return 'Pase VIP & Networking';
      case 'piso': return 'Piso de Exhibición (Sin Costo)';
      default: return type;
    }
  };

  return (
    <Html>
      <Head />
      <Preview>¡Registro exitoso para CLN Evento de Cierre 2026!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>¡Hola, {nombre}!</Heading>
          <Text style={text}>
            Hemos recibido con éxito tu solicitud de registro para el <strong>Evento de Cierre 2026</strong> de la Comunidad Logística Nicaragüense.
          </Text>
          <Section style={section}>
            <Text style={details}>
              <strong>Tipo de Acceso:</strong> {getTicketName(ticketType)}
            </Text>
          </Section>
          <Text style={text}>
            Un ejecutivo de CLN se pondrá en contacto contigo muy pronto para brindarte más detalles y confirmar tu asistencia (así como las instrucciones de pago en caso de que aplique).
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Te esperamos pronto. Si tienes alguna consulta, no dudes en responder a este correo.
            <br />
            <strong>El equipo de CLN</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos básicos en línea (React Email prefiere objetos de estilo CSS)
const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  marginTop: '40px',
  marginBottom: '40px',
  maxWidth: '600px',
};

const h1 = {
  color: '#f97316', // cln-500
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
};

const section = {
  backgroundColor: '#fff7ed',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
  borderLeft: '4px solid #f97316',
};

const details = {
  color: '#9a3412',
  fontSize: '16px',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
};

export default RegistrationEmail;
