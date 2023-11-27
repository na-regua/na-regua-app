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
          description: 'Preencha as informações da perfil.',
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
    completeQR: {
      title: 'Pronto!',
      subtitle: 'Seu perfil está completo, agora é só compartilhar o QRCode.',
      buttons: {
        skip: 'Pular',
        share: 'Compartilhar',
      },
    },
    shareQR: {
      subtitle: 'Aponte a câmera para o QR Code para ser atendido.',
      buttons: {
        close: 'Fechar',
        save: 'Salvar',
      },
    },
    settings: {
      title: 'Configurações',
      subtitle: 'Ajustes e preferências do aplicativo.',
      logout: 'Sair',
      barbershop: 'Barbearia - ',
      code: 'Código - ',
      menus: {
        profile: {
          title: 'Perfil',
          subtitle: 'Editar informações do perfil.',
        },
        plan: {
          title: 'Plano',
          subtitle: 'Gerenciar plano e pagamentos.',
        },
        custommers: {
          title: 'Clientes',
          subtitle: 'Gerenciar clientes.',
        },
        workers: {
          title: 'Funcionários',
          subtitle: 'Gerenciar funcionários.',
        },
        services: {
          title: 'Serviços',
          subtitle: 'Gerenciar serviços.',
        },
        serviceConfig: {
          title: 'Atendimento',
          subtitle: 'Ajustes de agendamento e fila.',
        },
      },
    },
    servicesConfig: {
      title: 'Atendimento',
      subtitle: 'Ajustes de agendamento e fila.',
      goBack: 'Voltar',

      sections: {
        general: {
          title: 'Geral',
          subtitle: 'Ajustes gerais de atendimento.',
        },
        businessDays: {
          title: 'Dias úteis',
          subtitle: 'Ajustes de atendimento.',
        },
        holidays: {
          title: 'Fim de semana ou feriados',
          subtitle: 'Ajustes de atendimento.',
        },
      },
      fields: {
        workTime: 'Horário de funcionamento',
        workDays: 'Dias de funcionamento',
        schedulesByDay: 'Agendamentos por dia',
        scheduleLimit: 'Limite de agendamento',
        scheduleTime: 'Horários de agendamento',
      },
      buttons: {
        save: 'Salvar',
      },
    },
    editUser: {
      title: 'Perfil',
      subtitle: 'Editar perfil',
      goBack: 'Voltar',
      sections: {
        profile: 'Perfil',
        address: 'Endereço',
        pictures: 'Fotos',
      },
      buttons: {
        save: 'Salvar',
      },
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
        cancel: 'Cancelar',
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
        cancel: 'Cancelar',
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
    addScheduleTime: {
      title: 'Adicionar horário',
      fields: {
        time: 'Horário',
      },
      buttons: {
        add: 'Adicionar',
      },
    },
  },
  units: {
    minutes: 'minutos',
    money: 'R$',
  },
  roles: {
    custommer: 'Cliente',
    worker: 'Barbeiro',
    admin: 'Administrador',
  },
  scheduleLimits: {
    week: '+ 7 dias',
    twoWeeks: '+ 15 dias',
    month: '+ 30 dias',
  },
  nav: {
    links: {
      queue: 'Fila',
      schedule: 'Agenda',
      billing: 'Finanças',
      settings: 'Ajustes',
    },
  },
};

export default ptBr;
