import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:na_regua/application/application.dart';

final appThemeProvider = StateProvider<bool>((ref) => false);

ThemeData getAppTheme(BuildContext context, bool isDarkTheme) {
  return ThemeData(
      fontFamily: 'Poppins',
      primaryColor: isDarkTheme ? ThemeColors().yellow : ThemeColors().purple,
      scaffoldBackgroundColor: isDarkTheme
          ? ThemeColors().backgroundDark
          : ThemeColors().backgroundLight,
      textTheme: Theme.of(context)
          .textTheme
          .copyWith(
            displayLarge: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 32, fontWeight: FontWeight.w700),
            displayMedium: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 29, fontWeight: FontWeight.w600),
            displaySmall: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 26, fontWeight: FontWeight.w700),
            headlineLarge: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 23, fontWeight: FontWeight.w600),
            headlineMedium: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 20, fontWeight: FontWeight.w600),
            headlineSmall: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontSize: 19, fontWeight: FontWeight.w500),
            bodyLarge: Theme.of(context)
                .textTheme
                .bodyLarge
                ?.copyWith(fontSize: 16, fontWeight: FontWeight.w500),
            bodyMedium: Theme.of(context)
                .textTheme
                .bodyMedium
                ?.copyWith(fontSize: 16, fontWeight: FontWeight.w400),
            bodySmall: Theme.of(context)
                .textTheme
                .bodySmall
                ?.copyWith(fontSize: 14, fontWeight: FontWeight.w400),
            labelLarge: Theme.of(context)
                .textTheme
                .labelLarge
                ?.copyWith(fontSize: 14, fontWeight: FontWeight.w600),
            labelSmall: Theme.of(context)
                .textTheme
                .labelSmall
                ?.copyWith(fontSize: 12, fontWeight: FontWeight.w300),
          )
          .apply(
              displayColor:
                  isDarkTheme ? ThemeColors().white3 : ThemeColors().dark3,
              bodyColor:
                  isDarkTheme ? ThemeColors().white2 : ThemeColors().dark2,
              fontFamily: 'Poppins'),
      listTileTheme: ListTileThemeData(
          iconColor: isDarkTheme ? Colors.orange : Colors.purple),
      appBarTheme: AppBarTheme(
        backgroundColor: isDarkTheme
            ? ThemeColors().backgroundDark
            : ThemeColors().backgroundLight,
      ),
      extensions: <ThemeExtension<AppColors>>[
        AppColors(
          text1: isDarkTheme ? ThemeColors().white1 : ThemeColors().dark1,
          text2: isDarkTheme ? ThemeColors().white2 : ThemeColors().dark2,
          text3: isDarkTheme ? ThemeColors().white3 : ThemeColors().dark3,
          background: isDarkTheme
              ? ThemeColors().backgroundDark
              : ThemeColors().backgroundLight,
        )
      ]);
}
