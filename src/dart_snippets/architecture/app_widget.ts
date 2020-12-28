const AppWidget = (title: string) => {
    return `import 'package:flutter/material.dart';
import '/routes/router.gr.dart';

class AppWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.black,
      ),
      title: ${title},
      debugShowCheckedModeBanner: false,
      onGenerateRoute: Router.onGenerateRoute,
      initialRoute: Router.homeScreen,
      navigatorKey: Router.navigator.key,
    );
  }
}
`;
};

export default AppWidget;