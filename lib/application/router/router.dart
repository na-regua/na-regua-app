import 'package:flutter/material.dart';
import 'package:na_regua/core/core.dart';

class AppRoutes {
  // get initial route
  static getInitialRoute(
      // {String? serverToken}
      ) {
    return const JoinPage().routeName;
  }

  // get all app routes
  static Map<String, WidgetBuilder> getRoutes(
      // {
      // required BehaviorSubject<ThemeMode?> notifierThemeMode,
      // required BehaviorSubject<Locale?> notifierLocale,
      // }
      ) {
    return {
      const JoinPage().routeName: (BuildContext context) => const JoinPage(
          // notifierThemeMode: notifierThemeMode,
          ),
    };
  }
}
