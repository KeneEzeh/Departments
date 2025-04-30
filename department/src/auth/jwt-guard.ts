import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const graphql_context = GqlExecutionContext.create(context).getContext();
    const req = graphql_context.req;
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    return req;
  }

  extractTokenFromHeader(request: any): string | null {
    const token = request.headers['authorization']?.split(' ')[1];
    return token || null;
  }
}
