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
  // TODO: Actualizar con la tarifa definitiva cuando se confirme
  const price = 70;
  const discount = 10;
  const total = price - discount;

  return (
    <Html>
      <Head />
      <Preview>Registro recibido · Pago pendiente</Preview>
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
                <span style={badge}>Registro recibido · Pago pendiente</span>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={label}>Reserva de acceso</Text>
            <Heading style={h1}>
              ¡Gracias por registrarte en Expo Logística CLN 2026!
            </Heading>
            <Text style={greeting}>
              Hola <strong style={primaryText}>{nombre}</strong>, tu solicitud para <strong style={primaryText}>Acceso Congreso</strong> ha sido recibida con éxito.
              Para asegurar tu espacio, por favor completa tu pago siguiendo las instrucciones a continuación.
            </Text>
          </Section>

          {/* Resumen de tu reserva */}
          <Section style={summarySection}>
            <Text style={sectionTitle}>Resumen de tu reserva</Text>
            <Row style={summaryRow}>
              <Column><Text style={summaryLabel}>Acceso</Text></Column>
              <Column align="right"><Text style={summaryValue}>Acceso Congreso</Text></Column>
            </Row>
            <Row>
              <Column><Text style={summaryLabel}>A nombre de</Text></Column>
              <Column align="right"><Text style={summaryValue}>{nombre}</Text></Column>
            </Row>
          </Section>

          {/* Resumen de Pago */}
          <Section style={paymentBoxContainer}>
            <Section style={paymentBox}>
              <Text style={paymentBoxTitle}>Resumen de pago</Text>
              <Row style={paymentRow}>
                <Column><Text style={paymentLabel}>Acceso Congreso (Regular)</Text></Column>
                <Column align="right"><Text style={paymentValue}>US$ {price.toFixed(2)}</Text></Column>
              </Row>
              <Row style={paymentRow}>
                <Column><Text style={{...paymentLabel, color: '#16a34a'}}>Preventa (Hasta 30 Oct)</Text></Column>
                <Column align="right"><Text style={{...paymentValue, color: '#16a34a'}}>- US$ {discount.toFixed(2)}</Text></Column>
              </Row>
              {/* IVA Eliminado de la vista del correo */}
              <Row style={paymentTotalRow}>
                <Column><Text style={paymentTotalLabel}>Total a depositar</Text></Column>
                <Column align="right"><Text style={paymentTotalValue}>US$ {total.toFixed(2)}</Text></Column>
              </Row>
            </Section>
          </Section>

          {/* Transferencia Bancaria */}
          <Section style={bankSection}>
            <Text style={bankTitle}>Transferencia bancaria</Text>
            <Text style={bankSubtitle}>Realiza el depósito en la siguiente cuenta:</Text>

            <Text style={bankAccountLabel}>Cuenta a nombre de</Text>
            <Text style={bankAccountName}>MARIA DE LA CONCEPCION CRUZ ESPINOZA</Text>

            <Row>
              <Column>
                <Text style={bankName}>Banco BAC</Text>
                <Text style={bankType}>Cuenta en Dólares</Text>
                <Text style={bankNumber}>371785908</Text>
              </Column>
            </Row>

            <Text style={referenceText}>Referencia: <strong style={primaryText}>{nombre} · Expo Logística 2026</strong></Text>
          </Section>

          {/* Instrucciones finales */}
          <Section style={instructionsSection}>
            <Text style={instructionsText}>
              <strong style={{...primaryText, fontSize: '16px'}}>CONFIRMÁ TU ACCESO</strong><br/><br/>
              Enviá el voucher de transferencia, en imagen o PDF, a:<br/>
              <a href="mailto:cln@nilogistic.com" style={{color: '#00345b', fontWeight: 'bold'}}>cln@nilogistic.com</a><br/><br/>
              Una vez validado el pago, recibirás por correo electrónico la confirmación oficial de tu participación.<br/><br/>
              <strong>Importante:</strong> Tu espacio quedará asegurado una vez confirmado el pago, sujeto a disponibilidad de cupos.
            </Text>
          </Section>

          <Section style={qrSection}>
            <Text style={qrTitle}>
              Después de validar el comprobante, te enviaremos tu código QR habilitado por correo electrónico.
            </Text>
            <Text style={qrSubtitle}>
              Tu QR se utiliza para el ingreso y debe presentarse desde tu teléfono el día del evento.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong style={{...primaryText, fontSize: '15px'}}>¡Nos vemos en ExpoLogísticaCLN2026!</strong><br /><br />
              <strong>Comunidad Logística Nicaragüense</strong><br />
              Aprender · Conectar · Compartir<br />
              Conectando profesionales - Potenciando la logística<br />
              <strong>#SoyCLN</strong><br /><br />
              Consultar agenda del evento: <a href="https://expologistic-cln2026.nilogistic.com/agenda" style={footerLink}>https://expologistic-cln2026.nilogistic.com/agenda</a>
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
  background: 'linear-gradient(90deg, #0086a0 0%, #004768 100%)', // Adaptado a los colores del logo de Nicaragua
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
  fontSize: '26px',
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
  backgroundColor: '#007f91', // Color teal similar a la imagen
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
  fontSize: '14px',
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
  fontSize: '13px',
};

const bankNumber = {
  margin: '0',
  color: '#ff5e00',
  fontSize: '18px',
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
  padding: '0 34px 20px',
};

const instructionsText = {
  margin: '0',
  padding: '0',
  color: '#555555',
  fontSize: '14px',
  lineHeight: '1.55',
};

const qrSection = {
  padding: '0 34px 34px',
  borderTop: '1px solid #dedede',
  marginTop: '20px',
  paddingTop: '20px',
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
  fontSize: '13px',
  lineHeight: '1.55',
};

const footerLink = {
  color: '#002b49',
  textDecoration: 'none',
};

export default RegistrationEmail;
