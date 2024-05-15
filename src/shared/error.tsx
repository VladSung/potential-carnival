import { AppShellMain, Container,Text, Flex } from "@mantine/core";
import { IconBroadcastOff } from "@tabler/icons-react";

export const ErrorElement = ()=>(
  <AppShellMain>
    <Container>
      <Flex justify='center' align='center' direction='column'>
        <IconBroadcastOff  size={64} />
        <Text mt='md' fw={500} ta='center'>Произошла ошибка.</Text>
        <Text ta='center'>Проверьте подключение к интернету и перезагрузите страницу</Text>
      </Flex>
    </Container>
  </AppShellMain>
)