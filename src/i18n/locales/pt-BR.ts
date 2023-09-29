const ptBr = {
  barber: {
    signUp: {
      title: 'Cadastro',
      subtitle: 'Preencha as informações abaixo para continuar.',
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        password: 'Senha',
        postalCode: 'CEP',
        street: 'Rua',
        complement: 'Complemento',
        number: 'N°',
        city: 'Cidade',
        uf: 'UF',
        neighborhood: 'Bairro',
      },
      steps: {
        '1': {
          title: 'Perfil',
          description: 'Preencha as informações de login.',
        },
        '2': {
          title: 'Endereço',
          description: 'Preencha as informações do endereço.',
        },
        '3': {
          title: 'Fotos',
          description: 'Selecione e envie as fotos do local.',
        },
        '4': {
          title: 'Avatar',
          description: 'Selecione e envie a foto do perfil.',
        },
      },
      buttons: {
        send: 'Enviar',
        next: 'Próximo',
      },
    },
  },
  generic: {
    verifyPhone: {
      title: 'Validação',
      subtitle: 'Digite o código recebido no whatsapp para continuar',
      sendAgain: 'Enviar novamente',
      buttons: {
        send: 'Enviar',
      },
    },
    login: {
      title: 'Bem vindo',
      subtitle: 'Selecione o meio de fazer login.',
      buttons: {
        email: 'E-mail',
        whatsapp: 'Whatsapp',
      },
      signUp: 'Quero me cadastrar.',
    },
    loginEmail: {
      title: 'Login',
      subtitle: 'Preencha os campos abaixo para continuar.',
      fields: {
        email: 'E-mail',
        password: 'Senha',
      },
      buttons: {
        login: 'Entrar',
      },
    },
    loginWhatsapp: {
      title: 'Whatsapp',
      subtitle: 'Informe o número do telefone whatsapp para continuar.',
      fields: {
        phone: 'Whatsapp',
      },
      buttons: {
        sendCode: 'Enviar código',
      },
    },
    loginVerify: {
      title: 'Validação',
      subtitle: 'Digite o código recebido via Whatsapp para fazer login.',
      sendAgain: 'Enviar novamente',
      buttons: {
        login: 'Entrar',
      },
    },
  },
};

export default ptBr;
