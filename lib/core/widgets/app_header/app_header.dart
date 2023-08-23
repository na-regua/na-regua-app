import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:na_regua/application/application.dart';

class AppHeader extends ConsumerStatefulWidget {
  const AppHeader({Key? key = const Key('app_header')}) : super(key: key);

  @override
  AppHeaderState createState() => AppHeaderState();
}

class AppHeaderState extends ConsumerState<AppHeader> {
  onPressTheme() {
    ref.read(appThemeProvider.notifier).state =
        !ref.read(appThemeProvider.notifier).state;
  }

  @override
  Widget build(BuildContext context) {
    var isDarkTheme = ref.watch(appThemeProvider);

    return Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: <Widget>[
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      color: Theme.of(context).primaryColor),
                ),
                const SizedBox(
                  width: 12,
                ),
                Text('Na Régua',
                    style: Theme.of(context)
                        .textTheme
                        .bodyLarge
                        ?.copyWith(color: colors(context).text2)),
              ],
            ),
            Row(children: <Widget>[
              TextButton(
                onPressed: onPressTheme,
                child: Text(
                  isDarkTheme ? 'Dark' : 'Light',
                  style: TextStyle(color: Theme.of(context).primaryColor),
                ), // <-- Set bg color to lightgreen
                // Add more properties
              ),
            ])
          ],
        )
      ],
    );
  }
}
