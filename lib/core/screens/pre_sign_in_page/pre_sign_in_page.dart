import 'package:flutter/material.dart';
import 'package:na_regua/core/core.dart';

class PreSignInPage extends BasePageScreen {
  const PreSignInPage({
    Key key = const Key('join_page'),
  }) : super(key: key, routeName: '/join');

  @override
  PreSignInPageState createState() => PreSignInPageState();
}

class PreSignInPageState extends BasePageScreenState<PreSignInPage>
    with BaseScreen {
  @override
  String title = 'Cadastro';

  @override
  String subtitle = 'Informe seus dados para criar um perfil.';

  @override
  Widget body() {
    return Flexible(
        flex: 1,
        child: Container(
          padding: const EdgeInsets.fromLTRB(0, 24, 0, 24),
          child: const Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Wrap(
                  runSpacing: 24,
                  children: <Widget>[
                    InputWidget(
                      label: 'Nome',
                    ),
                    InputWidget(
                      label: 'E-mail',
                    ),
                    InputWidget(label: 'Senha')
                  ],
                ),
                ElevatedButton(onPressed: null, child: Text('Continuar'))
              ]),
        ));
  }
}
