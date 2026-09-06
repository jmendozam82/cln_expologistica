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

  const isFree = ticketType === 'piso';
  // Precios de ejemplo (puedes ajustarlos luego)
  const price = ticketType === 'vip' ? 210 : (ticketType === 'congreso' ? 150 : 0);
  const iva = price * 0.15; // 15% IVA Nicaragua
  const total = price + iva;

  return (
    <Html>
      <Head />
      <Preview>{isFree ? 'Tu registro ha sido confirmado' : 'Valida tu acceso al Evento completando tu pago'}</Preview>
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
                  alt="CLN Evento 2026" 
                  style={logoImage} 
                />
              </Column>
              <Column align="right">
                <span style={badge}>Confirmación de acceso</span>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={label}>Reserva de acceso</Text>
            <Heading style={h1}>
              {isFree ? 'Tu registro ha sido confirmado exitosamente' : 'Valida tu acceso al Congreso completando tu pago'}
            </Heading>
            <Text style={greeting}>
              Hola <strong style={primaryText}>{nombre}</strong>, tu reserva para <strong style={primaryText}>{getTicketName(ticketType)}</strong> está registrada. 
              {!isFree && ' Para confirmar tu acceso, realiza el depósito y comparte el comprobante.'}
            </Text>
          </Section>

          {/* Resumen de tu reserva */}
          <Section style={summarySection}>
            <Text style={sectionTitle}>Resumen de tu reserva</Text>
            <Row style={summaryRow}>
              <Column><Text style={summaryLabel}>Acceso</Text></Column>
              <Column align="right"><Text style={summaryValue}>{getTicketName(ticketType)}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={summaryLabel}>A nombre de</Text></Column>
              <Column align="right"><Text style={summaryValue}>{nombre}</Text></Column>
            </Row>
          </Section>

          {/* Resumen de Pago (Solo si NO es gratis) */}
          {!isFree && (
            <Section style={paymentBoxContainer}>
              <Section style={paymentBox}>
                <Text style={paymentBoxTitle}>Resumen de pago</Text>
                <Row style={paymentRow}>
                  <Column><Text style={paymentLabel}>Acceso {getTicketName(ticketType)}</Text></Column>
                  <Column align="right"><Text style={paymentValue}>US$ {price.toFixed(2)}</Text></Column>
                </Row>
                <Row style={paymentRow}>
                  <Column><Text style={paymentLabel}>IVA (15%)</Text></Column>
                  <Column align="right"><Text style={paymentValue}>US$ {iva.toFixed(2)}</Text></Column>
                </Row>
                <Row style={paymentTotalRow}>
                  <Column><Text style={paymentTotalLabel}>Total a depositar</Text></Column>
                  <Column align="right"><Text style={paymentTotalValue}>US$ {total.toFixed(2)}</Text></Column>
                </Row>
              </Section>
            </Section>
          )}

          {/* Transferencia Bancaria (Solo si NO es gratis) */}
          {!isFree && (
            <Section style={bankSection}>
              <Text style={bankTitle}>Transferencia bancaria</Text>
              <Text style={bankSubtitle}>Realiza el depósito en cualquiera de las siguientes cuentas:</Text>
              
              <Text style={bankAccountLabel}>Cuentas a nombre de</Text>
              <Text style={bankAccountName}>Comunidad Logística Nicaragüense (CLN)</Text>
              
              <Row>
                <Column style={bankColLeft}>
                  <Text style={bankName}>Banco BAC</Text>
                  <Text style={bankType}>Cuenta en Dólares</Text>
                  <Text style={bankNumber}>123-456789-0</Text>
                </Column>
                <Column style={bankColRight}>
                  <Text style={bankName}>Banco LAFISE</Text>
                  <Text style={bankType}>Cuenta en Dólares</Text>
                  <Text style={bankNumber}>0987654321</Text>
                </Column>
              </Row>
              
              <Text style={referenceText}>Referencia: <strong style={primaryText}>{nombre} · CLN Evento 2026</strong></Text>
            </Section>
          )}

          {/* Instrucciones finales */}
          {!isFree && (
            <Section style={instructionsSection}>
              <Text style={instructionsText}>
                <strong style={primaryText}>Envía el comprobante:</strong> responde a este correo y adjunta la imagen o PDF de tu depósito. Incluye tu nombre completo para identificarlo con rapidez.
              </Text>
            </Section>
          )}

          <Section style={qrSection}>
            <Text style={qrTitle}>
              {isFree 
                ? 'El acceso es libre de costo. Recibirás tu código QR habilitado próximamente.' 
                : 'Después de validar el comprobante, te enviaremos tu código QR habilitado por correo electrónico.'}
            </Text>
            <Text style={qrSubtitle}>
              Tu QR se utiliza para el ingreso y debe presentarse desde tu teléfono el día del evento.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong style={primaryText}>CLN Evento de Cierre 2026</strong><br />
              Diciembre 2026 · Managua, Nicaragua<br />
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
  padding: '0 34px 16px',
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

const paymentBoxContainer = {
  padding: '0 34px 28px',
};

const paymentBox = {
  backgroundColor: '#007f91',
  borderRadius: '12px',
  padding: '20px 22px 21px',
};

const paymentBoxTitle = {
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold',
  display: 'block',
  margin: '0 0 12px 0',
};

const paymentRow = {
  marginBottom: '8px',
};

const paymentLabel = {
  color: '#d6d6d6',
  fontSize: '15px',
  margin: 0,
};

const paymentValue = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: 0,
};

const paymentTotalRow = {
  marginTop: '15px',
};

const paymentTotalLabel = {
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold',
  borderTop: '1px solid #75b5bd',
  paddingTop: '15px',
  margin: 0,
};

const paymentTotalValue = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  lineHeight: '1.05',
  borderTop: '1px solid #75b5bd',
  paddingTop: '10px',
  margin: 0,
};

const bankSection = {
  padding: '0 34px 28px',
};

const bankTitle = {
  margin: '0 0 8px',
  color: '#002b49',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '1.3',
};

const bankSubtitle = {
  margin: '0 0 15px',
  color: '#555555',
  fontSize: '15px',
  lineHeight: '1.5',
};

const bankAccountLabel = {
  margin: '0',
  color: '#666666',
  fontSize: '14px',
};

const bankAccountName = {
  margin: '4px 0 13px',
  color: '#002b49',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '1.35',
};

const bankColLeft = {
  width: '50%',
  padding: '14px 18px 14px 0',
  borderTop: '1px solid #dedede',
  borderBottom: '1px solid #dedede',
  verticalAlign: 'top',
};

const bankColRight = {
  width: '50%',
  padding: '14px 0 14px 18px',
  borderTop: '1px solid #dedede',
  borderBottom: '1px solid #dedede',
  borderLeft: '1px solid #dedede',
  verticalAlign: 'top',
};

const bankName = {
  margin: '0',
  color: '#002b49',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '1.3',
};

const bankType = {
  margin: '5px 0 7px',
  color: '#666666',
  fontSize: '14px',
};

const bankNumber = {
  margin: '0',
  color: '#ff5e00',
  fontSize: '20px',
  fontWeight: 'bold',
};

const referenceText = {
  padding: '15px 0 0',
  color: '#555555',
  fontSize: '14px',
  borderTop: '1px solid #dedede',
  margin: '15px 0 0 0',
};

const instructionsSection = {
  padding: '0 34px 30px',
};

const instructionsText = {
  margin: '0',
  padding: '15px 0',
  borderTop: '1px solid #dedede',
  borderBottom: '1px solid #dedede',
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
