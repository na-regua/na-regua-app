import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:na_regua/application/application.dart';
import 'package:na_regua/core/core.dart';

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
  Widget build(
    BuildContext context,
  ) {
    return Scaffold(
        appBar: AppBar(
          toolbarHeight: 0,
          shadowColor: Colors.transparent,
        ),
        body: Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            padding: const EdgeInsets.all(18),
            child: Column(
              children: <Widget>[
                const AppHeader(),
                const SizedBox(
                  height: 18,
                ),
                Flexible(
                    flex: 1,
                    fit: FlexFit.tight,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.start,
                          runSpacing: 4,
                          children: [
                            Text(
                              title,
                              style: Theme.of(context).textTheme.displayMedium,
                            ),
                            Text(
                              subtitle,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyLarge
                                  ?.copyWith(color: colors(context).text1),
                            ),
                          ],
                        ),
                        body(),
                      ],
                    ))
              ],
            )));
    //
  }
}
