const Router = () => {
    return `import 'package:auto_route/auto_route_annotations.dart';

import '../pages/home/home_screen.dart';

@MaterialAutoRouter()
class $Router {
    @initial
    HomeScreen homeScreen;
}
`;
};

export default Router;