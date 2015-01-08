import 'package:stagexl/stagexl.dart';

class ReelsEvent extends Event {

  static const String STARTING = 'starting';
  static const String STARTED = 'started';

  static const String STOPPING = 'stopping';
  static const String STOPPED = 'stopped';

  ReelsEvent(String type, bool bubbles) : super(type, bubbles);

}
