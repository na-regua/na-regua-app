import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:na_regua/application/application.dart';

class InputWidget extends ConsumerWidget {
  final String? label;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    bool isDarkTheme = ref.watch(appThemeProvider);

    Color borderColor =
        isDarkTheme ? ThemeColors().dark2 : ThemeColors().border;

    Color primaryColor = Theme.of(context).primaryColor;

    return SizedBox(
      height: 48,
      child: TextField(
        onChanged: (value) => {
          print(value),
        },
        style: Theme.of(context)
            .textTheme
            .bodyMedium
            ?.copyWith(color: primaryColor),
        decoration: InputDecoration(
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: borderColor, width: 2.0),
              borderRadius: BorderRadius.circular(8.0),
            ),
            border: OutlineInputBorder(
                borderRadius: const BorderRadius.all(Radius.circular(8.0)),
                borderSide: BorderSide(color: borderColor, width: 2.0)),
            focusedBorder: OutlineInputBorder(
                borderRadius: const BorderRadius.all(Radius.circular(8.0)),
                borderSide: BorderSide(color: primaryColor, width: 2.0)),
            labelText: label,
            floatingLabelStyle: TextStyle(
                color: primaryColor, fontWeight: FontWeight.w500, fontSize: 18),
            labelStyle: Theme.of(context)
                .textTheme
                .bodyMedium
                ?.copyWith(color: ThemeColors().placeholder)),
      ),
    );
  }

  const InputWidget({super.key, required this.label});
}
