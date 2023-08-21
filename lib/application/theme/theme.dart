import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final appThemeProvider = StateProvider<bool>((ref) => false);

ThemeData getAppTheme(BuildContext context, bool isDarkTheme) {
  return ThemeData(
      fontFamily: 'Poppins',
      scaffoldBackgroundColor: isDarkTheme ? Colors.black : Colors.white,
      textTheme: Theme.of(context).textTheme.apply(
          bodyColor: isDarkTheme ? Colors.white : Colors.black,
          displayColor: Colors.black,
          fontFamily: 'Poppins'),
      listTileTheme: ListTileThemeData(
          iconColor: isDarkTheme ? Colors.orange : Colors.purple),
      appBarTheme: AppBarTheme(
        backgroundColor: isDarkTheme ? Colors.black : Colors.white,
      ));
}
