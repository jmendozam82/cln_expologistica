import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';

interface RegistrationEmailProps {
  nombre: string;
}

export const RegistrationEmail = ({
  nombre,
}: RegistrationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Hemos recibido tu solicitud de acceso a Expo Logística CLN 2026</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Top Gradient Border */}
          <div style={topBorder} />
          
          {/* Header Banner */}
          <Section style={headerBanner}>
            <Row>
              <Column>
                <Img 
                  src="https://expologistic-cln2026.nilogistic.com/logo-horizontal.jpg" 
                  width="180" 
                  height="auto"
                  alt="EXPO LOGÍSTICA · CLN · 2026" 
                  style={logoImage} 
                />
              </Column>
              <Column align="right">
                <span style={badge}>Solicitud Recibida</span>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={label}>Acceso Congreso</Text>
            <Heading style={h1}>
              Hemos recibido tu solicitud de acceso
            </Heading>
            <Text style={greeting}>
              Hola <strong style={primaryText}>{nombre}</strong>, gracias por tu interés en unirte al gran encuentro anual de la logística nicaragüense. 
              Hemos recibido tus datos correctamente y nuestro equipo organizador se pondrá en contacto contigo muy pronto para coordinar el proceso de pago y confirmar tu acceso definitivo.
            </Text>
          </Section>

          {/* Resumen de tu reserva */}
          <Section style={summarySection}>
            <Text style={sectionTitle}>Resumen de tu solicitud</Text>
            <Row style={summaryRow}>
              <Column><Text style={summaryLabel}>Tipo de acceso</Text></Column>
              <Column align="right"><Text style={summaryValue}>Acceso Congreso (Experiencia Completa)</Text></Column>
            </Row>
            <Row>
              <Column><Text style={summaryLabel}>A nombre de</Text></Column>
              <Column align="right"><Text style={summaryValue}>{nombre}</Text></Column>
            </Row>
            <Row style={{ marginTop: '6px' }}>
              <Column><Text style={summaryLabel}>Tarifa</Text></Column>
              <Column align="right"><Text style={summaryValue}>US$ XXX + IVA</Text></Column>
            </Row>
          </Section>

          {/* Instrucciones finales */}
          <Section style={instructionsSection}>
            <Text style={instructionsText}>
              <strong style={primaryText}>¿Qué sigue?</strong><br />
              Recibirás indicaciones de nuestro equipo con las opciones de pago (transferencia bancaria) correspondientes a tu tarifa. Una vez completado, te enviaremos tu código QR oficial habilitado para el evento.
            </Text>
          </Section>

          <Section style={qrSection}>
            <Text style={qrTitle}>
              Tu pase oficial
            </Text>
            <Text style={qrSubtitle}>
              Tu código QR oficial se utiliza para el ingreso y debe presentarse desde tu teléfono el día del evento. Te lo enviaremos tras la confirmación del pago.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong style={primaryText}>EXPO LOGÍSTICA · CLN · 2026</strong><br />
              20 de noviembre 2026 · DoubleTree by Hilton Managua<br />
              <a href="https://nilogistic.com" style={footerLink}>nilogistic.com</a>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

// --- ESTILOS ---

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, Helvetica, sans-serif',
  padding: '28px 12px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  borderRadius: '16px',
  border: '1px solid #d4e0e7',
  overflow: 'hidden',
  maxWidth: '768px',
};

const topBorder = {
  height: '7px',
  background: 'linear-gradient(90deg, #ff5e00 0%, #ff8a2a 100%)',
};

const headerBanner = {
  backgroundColor: '#002b49',
  backgroundImage: 'linear-gradient(125deg, #002b49 0%, #004768 54%, #0086a0 100%)',
  padding: '28px 34px',
};

const logoImage = {
  display: 'block',
  maxWidth: '100%',
  border: 0,
  borderRadius: '8px',
};

const badge = {
  display: 'inline-block',
  padding: '9px 13px',
  backgroundColor: '#ffffff',
  color: '#002b49',
  fontSize: '13px',
  fontWeight: 'bold',
  borderRadius: '999px',
  whiteSpace: 'nowrap' as const,
};

const contentSection = {
  padding: '37px 34px 23px',
};

const label = {
  margin: '0 0 10px',
  color: '#666666',
  fontSize: '14px',
  fontWeight: 'bold',
};

const h1 = {
  margin: '0',
  color: '#002b49',
  fontSize: '30px',
  lineHeight: '1.2',
  letterSpacing: '0',
};

const greeting = {
  margin: '18px 0 0',
  color: '#555555',
  fontSize: '15px',
  lineHeight: '1.6',
};

const primaryText = {
  color: '#002b49',
};

const summarySection = {
  padding: '0 34px 24px',
};

const sectionTitle = {
  padding: '14px 0 12px',
  color: '#002b49',
  fontSize: '15px',
  fontWeight: 'bold',
  borderTop: '1px solid #dedede',
  margin: 0,
};

const summaryRow = {
  marginBottom: '6px',
};

const summaryLabel = {
  color: '#666666',
  fontSize: '14px',
  margin: '4px 0',
};

const summaryValue = {
  color: '#002b49',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
  margin: '4px 0',
};

const instructionsSection = {
  padding: '0 34px 20px',
};

const instructionsText = {
  margin: '0',
  padding: '20px 24px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  color: '#555555',
  fontSize: '14px',
  lineHeight: '1.55',
};

const qrSection = {
  padding: '0 34px 34px',
};

const qrTitle = {
  margin: '0',
  color: '#002b49',
  fontSize: '16px',
  lineHeight: '1.45',
  fontWeight: 'bold',
};

const qrSubtitle = {
  margin: '11px 0 0',
  color: '#555555',
  fontSize: '14px',
  lineHeight: '1.55',
};

const footer = {
  padding: '20px 34px',
  backgroundColor: '#f7f7f7',
  borderTop: '1px solid #dedede',
};

const footerText = {
  margin: 0,
  color: '#555555',
  fontSize: '14px',
  lineHeight: '1.55',
};

const footerLink = {
  color: '#002b49',
  textDecoration: 'none',
};

export default RegistrationEmail;
