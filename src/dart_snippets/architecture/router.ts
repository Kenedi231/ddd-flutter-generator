const Router = () => {
    return `import 'package:auto_route/auto_route_annotations.dart';

import '../pages/home/home_screen.dart';

@MaterialAutoRouter(
  routes: [
    MaterialRoute(page: HomeScreen, initial: true),
  ]
)
class $AutoRouter {}
`;
};

export default Router;