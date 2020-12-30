const AppWidget = (title: string) => {
    return `import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

import 'routes/router.gr.dart';

class AppWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.black,
      ),
      title: '${title}',
      builder: ExtendedNavigator.builder<AutoRouter>(
        router: AutoRouter(),
        builder: (context, extendedNav) => Theme(
          data: ThemeData(brightness: Brightness.dark),
          child: extendedNav,
        ),
      ),
    );
  }
}
`;
};

export default AppWidget;