import 'package:flutter/material.dart';
import 'package:na_regua/core/core.dart';

class JoinPage extends BasePageScreen {
  const JoinPage({Key key = const Key('join')})
      : super(key: key, routeName: '/join');

  @override
  _JoinPageState createState() => _JoinPageState();
}

class _JoinPageState extends BasePageScreenState<JoinPage> with BaseScreen {
  @override
  String title = 'Cadastro';

  @override
  String subtitle = '';

  @override
  Widget body() {
    return const Row(
      children: [
        Expanded(
          flex: 1,
          child: Text('Oi', style: TextStyle(color: Colors.red)),
        ),
      ],
    );
  }
}
