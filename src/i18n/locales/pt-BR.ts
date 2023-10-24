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
        ok: 'Continuar',
      },
    },
    services: {
      title: 'Serviços',
      subtitle: 'Gerenciar serviços prestados.',
      goBack: 'Voltar',
      buttons: {
        add: '+ Serviço',
        ok: 'Salvar',
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
    worker: {
      titles: {add: 'Adicionar funcionário', edit: 'Editar funcionário'},
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Whatsapp',
        admin: 'Administrador ?!',
      },
      buttons: {
        add: 'Adicionar',
        save: 'Salvar',
      },
    },
    barberService: {
      titles: {add: 'Adicionar serviço', edit: 'Editar serviço'},
      fields: {
        name: 'Nome',
        price: 'Preço',
        durationInMinutes: 'Tempo médio',
        selectIcon: 'Selecione um ícone',
      },
      buttons: {
        add: 'Adicionar',
        save: 'Salvar',
      },
    },
    deleteWorker: {
      title: 'Remover funcionário',
      subtitle: 'Deseja realmente remover o funcionário - {{name}} ?',
      buttons: {
        no: 'Não',
        yes: 'Sim',
      },
    },
    deleteService: {
      title: 'Remover serviço',
      subtitle: 'Deseja realmente remover o serviço - {{name}} ?',
      buttons: {
        no: 'Não',
        yes: 'Sim',
      },
    },
  },
  units: {
    minutes: 'minutos',
    money: 'R$',
  },
};

export default ptBr;
