const ptBr = {
  barber: {
    signUp: {
      title: 'Cadastro',
      subtitle: 'Preencha as informações abaixo para continuar.',
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Whatsapp',
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
    preSignUp: {
      title: 'Pré-cadastro',
      subtitle:
        'Faltam alguns passos para completar seu perfil, deseja realizar isso agora ?',
      buttons: {
        later: 'Fazer isso depois...',
        now: 'Vamos lá!',
      },
    },
    workers: {
      title: 'Funcionários',
      subtitle: 'Gerenciar funcionários ativos.',
      goBack: 'Voltar',
      buttons: {
        add: '+ Funcionário',
        save: 'Salvar',
      },
    },
    services: {
      title: 'Serviços',
      subtitle: 'Gerenciar serviços prestados.',
      goBack: 'Voltar',
      buttons: {
        add: '+ Funcionário',
        save: 'Salvar',
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
      title: 'Olá, Seja bem vindo',
      subtitle: 'Para fazer o login selecione o método abaixo.',
      buttons: {
        email: 'E-mail',
        whatsapp: 'Whatsapp',
      },
      signUp: 'Desejo me cadastrar!',
      backLink: 'Voltar',
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
  modals: {
    addWorker: {
      title: 'Adicionar funcionário',
      subtitle: 'Preencha os campos abaixo para continuar.',
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Whatsapp',
      },
      buttons: {
        add: 'Adicionar',
      },
    },
  },
};

export default ptBr;
