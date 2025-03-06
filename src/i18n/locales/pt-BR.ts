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
      additional: '(Adicional)',
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
      messages: {
        noSchedules: 'Nenhum horário de agendamento cadastrado.',
      },
      sections: {
        general: {
          title: 'Geral',
          subtitle: 'Ajustes gerais de atendimento.',
        },
        schedule: {
          title: 'Agendamentos',
          subtitle: 'Ajustes de agendamentos.',
        },
      },
      fields: {
        workTime: 'Horário de funcionamento',
        workDays: 'Dias de funcionamento',
        schedulesByDay: 'Agendamentos por dia',
        scheduleLimit: 'Limite de agendamento',
        scheduleTime: 'Horários de agendamento',
        openBarberAuto: 'Abrir ao iniciar dia de funcionamento',
        openQueueAuto: 'Iniciar fila ao iniciar horário de funcionamento',
      },
      buttons: {
        save: 'Salvar',
        yes: 'Sim',
        no: 'Não',
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
    queue: {
      buttons: {
        start: 'Iniciar',
      },
      carousel: {
        qr: {
          title1: 'Compartilhe',
          title2: 'seu código',
          subtitle: 'Nunca foi tão fácil te achar.',
        },
        notifications: {
          title1: 'Acompanhe',
          title2: 'suas atividades',
          subtitle: 'Você no controle de tudo.',
        },
        billing: {
          title1: 'Veja seu',
          title2: 'negócio crescer',
          subtitle: 'Dinheiro? Cartão ? Pix? A gente anota pra você',
        },
      },
      preview: {
        title: 'Fila do dia',
        buttons: {
          finish: 'Encerrar',
          open: 'Abrir',
          join: 'Entrar',
        },
        labels: {
          workers: 'Funcionários',
          customers: 'Clientes',
          total: 'Total: {{-total}}',
          served: 'Atendidos: {{-total}}',
        },
      },
      status: {
        on: 'Aberta',
        paused: 'Pausada',
        off: 'Encerrada',
      },
    },
    schedule: {
      title: 'Agendamentos',
    },
    onQueue: {
      titles: {
        on: 'Fila aberta',
        paused: 'Fila pausada',
        off: 'Fila encerrada',
      },
      subtitles: {
        total: 'Clientes na fila: {{-total}}',
        totalServed: 'Atendidos: {{-total}}',
      },
      buttons: {
        pause: 'Pausar',
        resume: 'Continuar',
        finish: 'Encerrar',
        next: 'Próximo',
      },
      filters: {
        oldTickets: 'Ver antigos',
      },
      generic: {
        askToJoin: '{{-name}} deseja entrar na fila.',
      },
    },
  },
  customer: {
    signUp: {
      title: 'Cadastro',
      subtitle: 'Preencha as informações abaixo para criar seu perfil.',
      buttons: {
        continue: 'Continuar',
      },
      fields: {
        name: 'Nome',
        phone: 'Telefone',
        avatar: 'Selecione uma foto',
      },
    },
    verify: {
      title: 'Verificação',
      subtitle:
        'Digite o código recebido via SMS para verificar seu número de telefone.',
      buttons: {
        send: 'Enviar',
      },
      sendAgain: 'Enviar novamente',
    },
    settings: {
      title: 'Configurações',
      subtitle: 'Ajustes e preferências do aplicativo.',
      menus: {
        profile: {
          title: 'Perfil',
          subtitle: 'Editar dados do perfil.',
        },
        history: {
          title: 'Histórico',
          subtitle: 'Ver histórico de atendimentos.',
        },
        favorites: {
          title: 'Favoritos',
          subtitle: 'Ver barbearias favoritas.',
        },
        notifications: {
          title: 'Notificações',
          subtitle: 'Acompanhar notificações.',
        },
        permissions: {
          title: 'Permissões',
          subtitle: 'Ajustar permissões do aplicativo.',
        },
      },
      buttons: {
        rate: 'Avaliar',
      },
    },
    home: {
      titles: {
        ask1: 'O que',
        ask2: 'vai fazer?',
      },
      actions: {
        cut: {
          title: 'Cortar',
          description: 'Procure a barbearia ideal para você.',
        },
        queue: {
          title: 'Na\nFila',
        },
        mySchedule: {
          title: 'Agenda',
        },
      },
      buttons: {
        readQr: 'Ler QR Code',
        seeMore: 'Ver mais...',
      },
      tabs: {
        attendance: 'Para hoje',
        history: 'Histórico',
      },
    },
    cut: {
      fields: {
        search: 'Buscar',
        code: 'Insira o código ou busque pelo nome.',
      },
      select: {
        title: 'Quer cortar ?',
        subtitle: 'Selecione uma Barbearia',
        near: {
          title: 'Barbearias por perto:',
          subtitle: 'Confira as barbearias próximas a você.',
        },
        recents: {
          title: 'Recentes',
        },
        favorites: 'Suas favoritas!',
        noFavorites: 'Ops... Nenhuma barbearia favorita. Busque e adicione!',
      },
      attendance: {
        title: 'Atendimento',
        isCustomer: 'Você é cliente aqui!',
        types: {
          queue: 'Fila',
          queueDesc: '{{-total}} cliente(s) na fila.',
          noTicketsOnQueue: 'Nenhum cliente na fila, seja o primeiro!',
          schedule: 'Agendamento',
          scheduleDesc: '+{{-total}} horário(s) livre(s).',
          noSchedules: 'Nenhum horário disponível no momento.',
        },
        select: {
          type: 'Selecione o atendimento',
          service: 'Selecione o serviço',
          additionalServices: 'Serviços adicionais',
          optional: '(opcional)',
          day: 'Dia',
          time: '',
        },
      },
      buttons: {
        select: 'Selecionar',
        join: 'Entrar',
        schedule: 'Agendar',
        other: 'Outra',
        joinWait: 'Ficar em espera ...',
      },
      isRequired: '(Obrigatório)',
    },
    qrScan: {
      title: 'Ler QR Code',
      subtitle: 'Aponte a câmera para o QR Code da barbearia.',
      found: {
        title: 'Barbearia encontrada!',
        buttons: {
          other: 'Outra',
          continue: 'Continuar!!!',
        },
      },
    },
    onTicket: {
      titles: {
        pending: 'Aguarde...',
        queue: 'Na fila',
        schedule: 'Agendamento',
        finished: 'Finalizado',
        missed: 'Ops...',
        yourTime: 'Chegou sua vez!',
        paused: 'Ops... a fila foi pausada.',
      },
      subtitles: {
        pending:
          'Sua solicitação foi enviada ao barbeiro, aguarde a confirmação.',
        lastUpdate: 'Última atualização: {{-time}}',
        attendanceInfo: 'Informações do atendimento',
        additionalServices: '+Serviços adicionais',
        rate: 'Sua avaliação.',
        missedAt: 'Removido em: {{-time}}',
        missedQueue:
          'Seu atendimento foi cancelado, você foi removido da fila.',
      },
      info: {
        position: 'Posição',
        date: 'Data',
        time: 'Horário',
        duration: '{{-minutes}} minutos',
        prevision: 'Previsão',
        price: 'Preço',
        total: 'Total',
        noComment: 'Sem comentários.',
      },
      buttons: {beLate: 'Vou atrasar!', rate: 'Avaliar'},
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
      title: 'Seja bem vindo ao',
      subtitle1: 'Conectando histórias com estilo,',
      subtitle2: 'um corte de cada vez.',
      buttons: {
        email: 'E-mail',
        whatsapp: 'Whatsapp',
        barber: 'Barbeiro',
        customer: 'Cliente',
        continue: 'Continuar',
      },
      backLink: 'Voltar',
      show: 'Exibir',
      hide: 'Esconder',
      barber: {
        mailSubtitle: 'Preencha o E-mail e a Senha para entrar.',
        phoneSubtitle: 'Insira seu telefone para continuar.',
        verifySubtitle: 'Digite o código recebido via SMS para enviar.',
        link: 'Quero fazer parte!',
        fields: {
          email: 'E-mail',
          password: 'Senha',
          phone: 'Whatsapp',
        },
        buttons: {
          join: 'Entrar',
          send: 'Enviar',
          phoneLogin: 'Entrar c/ Telefone',
          mailLogin: 'Entrar c/ E-mail',
          back: 'Voltar',
        },
        another: 'Entrar com outro número',
        again: 'Enviar novamente',
      },
      customer: {
        mailSubtitle: 'Insira seu e-mail para continuar.',
        verifySubtitle: 'Digite o código recebido via E-mail para entrar.',
        fields: {
          phone: 'Telefone',
          mail: 'E-mail',
        },
        buttons: {
          send: 'Enviar',
          enter: 'Entrar',
          anotherEmail: 'Entrar com outro E-mail',
          sendAgain: 'Enviar novamente',
        },
        link: 'Fazer cadastro rápido!',
      },
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
    notifications: {
      title: 'Notificações',
      subtitle: 'Acompanhe suas notificações.',
      markAllRead: 'ler todas',
      tabs: {
        all: 'Todas',
        unread: 'Não lidas',
      },
    },
    permissions: {
      title: 'Permissões',
      subtitle: 'Ajustar permissões do aplicativo.',
      buttons: {
        openConfig: 'Permissões do dispositivo',
      },
      items: {
        notifications: {
          title: 'Notificações',
          subtitle: 'Atualizações em tempo real.',
        },
        cam: {
          title: 'Câmera',
          subtitle: 'Leitura de QR Code.',
        },
        mic: {
          title: 'Microfone',
          subtitle: 'Leitura de QR Code.',
        },
        gallery: {
          title: 'Fotos e imagens',
          subtitle: 'Foto de perfil.',
        },
      },
      alert:
        'Para remover as permissões, acesse as configurações do dispositivo.',
    },
    header: {
      hello: 'Olá, ',
    },
  },
  modals: {
    worker: {
      titles: {add: 'Adicionar funcionário', edit: 'Editar funcionário'},
      fields: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        admin: 'Administrador ?!',
      },
      buttons: {
        cancel: 'Cancelar',
        add: 'Adicionar',
        save: 'Salvar',
      },
    },
    customerSelectedBarber: {
      title: 'Barbearia selecionada',
    },
    barberService: {
      titles: {add: 'Adicionar serviço', edit: 'Editar serviço'},
      fields: {
        name: 'Nome',
        price: 'Preço',
        durationInMinutes: 'Tempo médio',
        selectIcon: 'Selecione um ícone',
        additional: 'Serviço adicional ?',
      },
      buttons: {
        cancel: 'Cancelar',
        add: 'Adicionar',
        save: 'Salvar',
      },
    },
    deleteWorker: {
      title: 'Remover funcionário',
      subtitle: 'Deseja realmente remover o funcionário - {{-name}} ?',
      buttons: {
        no: 'Não',
        yes: 'Sim',
      },
    },
    deleteService: {
      title: 'Remover serviço',
      subtitle: 'Deseja realmente remover o serviço - {{-name}} ?',
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
    editPicture: {
      titlePhoto: 'Editar foto',
      titleAvatar: 'Editar avatar',
      buttons: {
        chooseFromGalery: 'Escolher foto da galeria',
        removePhoto: 'Remover foto',
      },
    },
    joinQueue: {
      title: 'Ops!',
      isOnQueue:
        'Você já está em uma fila, deseja entrar no modo de atendimento ?',
      queueOpened: 'Existe uma fila aberta, deseja entrar entrar e atender ?',
      buttons: {
        cancel: 'Cancelar',
        join: 'Entrar',
      },
    },
    customerJoinTodayQueue: {
      title: 'Na fila',
      subtitle:
        'Ao abrir o atendimento, você acompanha as atualizações em tempo real.',
    },
    rate: {
      title: 'Avaliar',
      question: 'E aí, o que achou do atendimento ?',
      labels: {
        good: 'Bom',
        bad: 'Ruim',
      },
      comment: 'Deixe aqui seu comentário...',
      buttons: {
        rate: 'Enviar',
      },
    },
    muteNotifications: {
      title: 'Notificações',
      subtitle:
        'Ao clicar em ”Quero Sim!” você irá receber notificações durante o atendimento, caso deseja desativar, clique em ”Quero Não!”.',
      buttons: {
        yes: 'Quero Sim!',
        no: 'Quero Não!',
      },
    },
    finishQueue: {
      title: 'Encerrar fila',
      subtitle:
        'Deseja realmente encerrar a fila? Ao finalizar os tickets restantes serão marcados como perdidos.',
      finish: 'Encerrar',
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
    back: 'Voltar',
  },
  calendar: {
    months: {
      full: {
        jan: 'Janeiro',
        feb: 'Fevereiro',
        mar: 'Março',
        apr: 'Abril',
        may: 'Maio',
        jun: 'Junho',
        jul: 'Julho',
        aug: 'Agosto',
        sep: 'Setembro',
        oct: 'Outubro',
        nov: 'Novembro',
        dec: 'Dezembro',
      },
      short: {
        jan: 'Jan',
        feb: 'Fev',
        mar: 'Mar',
        apr: 'Abr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Ago',
        sep: 'Set',
        oct: 'Out',
        nov: 'Nov',
        dec: 'Dez',
      },
    },
    weekDays: {
      single: {
        sun: 'D',
        mon: 'S',
        tue: 'T',
        wed: 'Q',
        thu: 'Q',
        fri: 'S',
        sat: 'S',
      },
      short: {
        sun: 'Dom',
        mon: 'Seg',
        tue: 'Ter',
        wed: 'Qua',
        thu: 'Qui',
        fri: 'Sex',
        sat: 'Sab',
      },
      full: {
        sun: 'Domingo',
        mon: 'Segunda',
        tue: 'Terça',
        wed: 'Quarta',
        thu: 'Quinta',
        fri: 'Sexta',
        sat: 'Sábado',
      },
    },
  },
  notification: {
    CUSTOMER_JOINED_QUEUE: 'Cliente {{-data.customer.name}} entrou na fila.',
    USER_ASK_TO_JOIN_QUEUE: '{{-data.user.name}} pediu para entrar na fila.',
    CUSTOMER_LEFT_QUEUE: 'Cliente {{-data.customer.name}} saiu da fila.',
    USER_ASK_TO_SCHEDULE:
      '{{-data.user.name}} pediu para agendar as {{-time}} do dia {{-day}}.',
    USER_WILL_BE_LATE_TO_APPOINTMENT:
      '{{-data.user.name}} vai se atrasar para o agendamento das {{-time}} do dia {{-day}}.',
    CUSTOMER_SCHEDULED_APPOINTMENT:
      'Cliente {{-data.customer.name}} agendou para as {{-time}} do dia {{-day}}.',
    CUSTOMER_CANCELLED_APPOINTMENT:
      'Cliente {{-data.customer.name}} cancelou o agendamento das {{-time}} do dia {{-day}}.',
    USER_REJECTED_APPOINTMENT_RESCHEDULE:
      '{{-data.user.name}} rejeitou o reagendamento para as {{-time}} do dia {{-day}}.',
    GENERATED_STATEMENT:
      'Foi gerado um extrato financeiro para o dia {{-day}}.',
    WORKER_ADD_USER_AS_CUSTOMER:
      '{{-data.worker.user.name}} te adicionou como cliente da barbearia {{-data.worker.barber.name}}.',
    BARBER_IS_ON: '{{-data.barber.name}} está aberto para atendimento.',
    BARBER_QUEUE_IS_ON: '{{-data.barber.name}} abriu a fila para atendimento.',
  },
  socketEvent: {
    WORKER_JOINED_QUEUE: 'Barbeiro {{-worker.user.name}} entrou na fila.',
    WORKER_NOT_OWNER: '{{-worker.user.name}} não é o proprietário da fila.',
    WORKER_IS_NOT_IN_QUEUE: '{{-worker.user.name}} não está na fila.',
    WORKER_IS_ALREADY_IN_QUEUE: '{{-worker.user.name}} já está na fila.',
    WORKER_NOT_FOUND: 'O Funcionário não foi encontrado.',
    WORKER_APPROVED_TICKET:
      '{{-worker.user.name}} aprovou seu ticket de atendimento na barbearia {{-worker.barber.name}}.',
    WORKER_REJECTED_TICKET:
      '{{-worker.user.name}} rejeitou seu ticket de atendimento na barbearia {{-worker.barber.name}}.',
    WORKER_SERVED_TICKET:
      '{{-worker.user.name}} finalizou seu ticket de atendimento na barbearia {{-worker.barber.name}}.',
    WORKER_MISSED_TICKET:
      '{{-worker.user.name}} removeu seu ticket de atendimento na barbearia {{-worker.barber.name}}.',
    TICKET_SERVED: 'O cliente {{-customer.name}} foi atendido.',
    TICKET_MISSED: 'O cliente {{-customer.name}} perdeu o atendimento.',
    TICKET_REMOVED:
      'O ticket de atendimento do cliente {{-customer.name}} foi removido.',
    TICKET_IS_NOT_IN_QUEUE: 'O ticket não está na fila.',
    QUEUE_FINISHED: 'A fila foi finalizada.',
    QUEUE_PAUSED: 'A fila foi pausada.',
    QUEUE_RESUMED: 'A fila foi retomada.',
    QUEUE_OFF: 'A fila está encerrada.',
    QUEUE_NOT_FOUND: 'Não foi possível encontrar a Fila!',
    BARBER_NOT_FOUND: 'Não foi possível encontrar a Barbearia.',
    BARBER_IS_CLOSED: 'A Barbearia está fechada.',
    USER_IS_NOT_WORKER: 'OPS! Você não é Funcionário da Barbearia.',
    USER_REJECTED:
      '{{-worker.user.name}} rejeitou o ticket de atendimento de {{-customer.name}}.',
    USER_APPROVED:
      '{{-worker.user.name}} aprovou o ticket de atendimento de {{-customer.name}}.',
    USER_JOINED: '{{-customer.name}} entrou na fila.',
    USER_LEAVE: '{{-customer.name}} saiu da fila.',

    USER_ALREADY_IN_QUEUE: 'Ops! Você já está na fila.',
    USER_ALREADY_IN_OTHER_QUEUE: 'Ops! Você está em outra fila.',
    USER_IS_NEXT:
      'Chegou sua vez de ser atendido, compareça ao local de atendimento o mais rápido!.',
  },
  errors: {
    INVALID_CEP: 'CEP inválido.',
    INVALID_PHONE_NUMBER: 'Número de telefone inválido.',
    INVALID_CODE: 'Código inválido.',
    INVALID_EMAIL: 'E-mail inválido.',
    INVALID_PASSWORD: 'Senha inválida.',
    INVALID_LOGIN_TYPE: 'Tipo de login inválido.',
    INVALID_TOKEN: 'Token inválido.',
    INVALID_FILE: 'Arquivo inválido.',
    INVALID_SCHEDULE_DATE: 'Data de agendamento inválida.',

    TOKEN_NOT_FOUND: 'Token não encontrado.',

    BARBER_NOT_CREATED: 'A Barbearia não foi criada.',
    BARBER_NOT_COMPLETED: 'Ops! A Barbeiro ainda não completou o perfil.',
    BARBER_NOT_FOUND: 'Barbeiro não encontrado.',
    BARBER_IS_CLOSED: 'Ops! A Barbearia está fechada.',

    QUEUE_NOT_FOUND: 'Fila não encontrada.',
    QUEUE_CAN_CREATE_ONLY_ONE_PER_DAY:
      'Somente uma fila pode ser criada por dia.',

    USER_NOT_CREATED: 'Usuário não foi criado.',
    USER_ALREADY_EXISTS: 'Usuário já existe.',
    USER_NOT_FOUND: 'Usuário não encontrado.',

    INTERNAL_SERVER_ERROR: 'Erro interno do servidor.',
    UNAUTHORIZED: 'Não autorizado.',
    FORBIDDEN: 'Proibido.',

    FILE_NOT_FOUND: 'Arquivo não encontrado.',
    FILE_NOT_SENT: 'Arquivo não enviado.',
    FILE_NOT_CREATED: 'Arquivo não foi criado.',
    THUMBS_LIMIT_EXCEEDED: 'Limite de miniaturas excedido.',

    NOTIFICATION_NOT_FOUND: 'Notificação não encontrada.',

    SERVICE_NOT_CREATED: 'Serviço não foi criado.',
    SERVICE_NOT_FOUND: 'Serviço não encontrado.',
    BARBER_SHOULD_HAVE_ONE_SERVICE: 'Barbeiro deve ter pelo menos um serviço.',
    NO_SERVICES_TO_DELETE: 'Nenhum serviço para deletar.',

    SCHEDULE_NOT_CREATED: 'Agendamento não foi criado.',

    WORKER_NOT_FOUND: 'Trabalhador não encontrado.',
    WORKER_NOT_CREATED: 'Trabalhador não foi criado.',
    NO_WORKERS_TO_DELETE: 'Nenhum trabalhador para deletar.',
    BARBER_SHOULD_HAVE_ONE_WORKER:
      'Barbeiro deve ter pelo menos um trabalhador.',

    '20404': 'Nenhuma verificação de autenticação encontrada.',
    '60202': 'Máximo de tentativas de verificação atingido.',
    '60203': 'Máximo de tentativas de envio atingido.',
    UNAVAILABLE_MESSAGE_SERVICE: 'Serviço de mensagens indisponível.',
    USER_ALREADY_IN_QUEUE: 'Ops! Você já está nessa fila.',
    USER_ALREADY_IN_OTHER_QUEUE: 'Ops! Você está em outra fila.',
    TICKET_NOT_FOUND: 'Ticket não encontrado.',

    INVALID_USER: 'Usuário inválido.',
  },
  notifications: {
    success: {
      updateProfile: 'Perfil atualizado com sucesso.',
    },
  },
  currency: {symbol: 'R$', format: 'R$ {{-value}}'},
  dates: {
    full: 'dd/MM/yyyy HH:mm',
    fullWHalfYear: 'dd/MM/yy HH:mm',
  },
  buttons: {
    approve: 'Aprovar',
    deny: 'Negar',
    cancel: 'Cancelar',
    save: 'Salvar',
    remove: 'Remover',
    leave: 'Sair',
    desmark: 'Desmarcar',
    open: 'Abrir',
    follow: 'Acompanhar',
    goBack: 'Voltar',
    next: 'Próximo',
    close: 'Fechar',
  },
  tickets: {
    types: {
      queue: 'Fila',
      schedule: 'Agendamento',
    },
  },
  empty: {
    rate: 'Sem avaliação.',
  },
};

export default ptBr;
