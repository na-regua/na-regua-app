import 'package:flutter/material.dart';

class ThemeColors {
  final Color purple = const Color(0xFF727EEC);
  final Color yellow = const Color(0xFFFFD166);
  final Color primary = const Color(0xFF4384DE);
  final Color primaryHover = const Color(0xFF1966D1);
  final Color secondary = const Color(0xFF8CA9D5);
  final Color secondaryHover = const Color(0xFF7790B7);
  final Color success = const Color(0xFF70C1B3);
  final Color successHover = const Color(0xff4DB1A0);
  final Color danger = const Color(0xffF25F5C);
  final Color dangerHover = const Color(0xffEE312D);
  final Color warning = const Color(0xffFFD166);
  final Color warningHover = const Color(0xffFFC233);
  final Color defaultC = const Color(0xffC4CAD9);
  final Color defaultCHover = const Color(0xffB3B9C6);
  final Color border = const Color(0xffEAEDF3);
  final Color borderHover = const Color(0xffD8DCE8);
  final Color disabled = const Color(0xffCDCDCD);
  final Color backgroundLight = const Color(0xffFFFFFF);
  final Color backgroundDark = const Color(0xff3E3E42);
  final Color placeholder = const Color(0xff8A8B8E);
  final Color dark1 = const Color(0xff77797E);
  final Color dark2 = const Color(0xff4A4B4E);
  final Color dark3 = const Color(0xff2D2D30);
  final Color white1 = const Color(0xffD9D9d9);
  final Color white2 = const Color(0xffF3F3F3);
  final Color white3 = const Color(0xffFFFFFF);

  ThemeColors();
}

@immutable
class AppColors extends ThemeExtension<AppColors> {
  final Color? text1;
  final Color? text2;
  final Color? text3;
  final Color? background;

  const AppColors(
      {required this.text1,
      required this.text2,
      required this.text3,
      required this.background});

  @override
  AppColors copyWith({
    Color? text1,
    Color? text2,
    Color? text3,
    Color? background,
  }) {
    return AppColors(
      text1: text1 ?? this.text1,
      text2: text2 ?? this.text2,
      text3: text3 ?? this.text3,
      background: background ?? this.background,
    );
  }

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }
    return AppColors(
      text1: Color.lerp(text1, other.text1, t),
      text2: Color.lerp(text2, other.text2, t),
      text3: Color.lerp(text3, other.text3, t),
      background: Color.lerp(background, other.background, t),
    );
  }
}

AppColors colors(context) => Theme.of(context).extension<AppColors>()!;
