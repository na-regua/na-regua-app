import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

abstract class BasePageScreen extends ConsumerStatefulWidget {
  final String routeName;

  const BasePageScreen(
      {Key super.key = const Key('base_page'), required this.routeName});
}

abstract class BasePageScreenState<Page extends BasePageScreen>
    extends ConsumerState<Page> {
  abstract String title;
  abstract String subtitle;
}

mixin BaseScreen<Page extends BasePageScreen> on BasePageScreenState<Page> {
  Widget body();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          toolbarHeight: 0,
          shadowColor: Colors.transparent,
        ),
        body: Container(
          child: body(),
        ));
  }
}
