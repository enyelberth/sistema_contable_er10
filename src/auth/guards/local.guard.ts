import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class LocalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let os = request.headers["user-agent"];
    const osRegex = /(Windows|Linux|Mac OS)/g;
    const browserRegex =
      /(Chrome|Firefox|Safari|Opera|Microsoft Edge|Brave|Chromium|Vivaldi)/g;
    let browser = os.toString().match(browserRegex)[0];
    os = os.toString().match(osRegex)[0];

    let clientIp =
      request.headers["x-forwarder-for"] || request.socket.remoteAddress;
    const ipRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    clientIp = clientIp.toString().match(ipRegex)[0];
    request.body.clientIp = clientIp;
    request.body.os = os;
    request.body.browser = browser;
    return clientIp ? true : false;
  }
}
