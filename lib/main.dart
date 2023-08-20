import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'core/core.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
        title: 'Na Régua',
        debugShowCheckedModeBanner: false,
        theme: getAppTheme(context, ref.watch(appThemeProvider)),
        // home: const MyHomePage(title: 'Flutter Demo Home Page'),
        initialRoute: AppRoutes.getInitialRoute(),
        routes: AppRoutes.getRoutes());
  }
}
