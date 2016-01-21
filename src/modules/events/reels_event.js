import 'package:stagexl/stagexl.dart';

class ReelsEvent extends Event {

  static const String STARTING = 'starting';
  static const String STARTED = 'started';

  static const String STOPPING = 'stopping';
  static const String STOPPED = 'stopped';

  final String result;

  ReelsEvent(String type, bool bubbles, {this.result:null}) : super(type, bubbles);

}
