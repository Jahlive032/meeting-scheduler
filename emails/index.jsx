import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  

  const baseUrl = '';
  
  export const Email = ({
    userFirstName,
    duration,
    meetingTime,
    date,
    meetingUrl,
    businessName
  }) => {

  
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img src={''} />
            </Section>
  
            <Section style={content}>
              {/*  <!-- Hero section --> */}
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Salut {userFirstName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                   Merci d'avoir programmé une réunion avec {businessName},
                  </Heading>
                    <Text>Veuillez trouver les détails de la réunion :</Text>
                  <Text style={paragraph}>
                    <b>Heure: </b>
                    {meetingTime}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Date: </b>
                    {date}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Emplacement: </b>
                    {meetingUrl}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Durée: </b>
                    {duration}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(0,0,0, 0.5)",
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    *Veuillez rejoindre la réunion avec les détails ci-dessus
                    {meetingUrl}
                  </Text>
  
                
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Pour nous joindre</Button>
                </Column>
              </Row>
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
              U.S.A. | www.yelp.com
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };

  export default Email;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    padding: "45px 0 0 0",
  };