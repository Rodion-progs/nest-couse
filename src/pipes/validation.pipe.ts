import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';
import {ValidationException} from '../exceptions/validation.exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages = errors.map(({ property, constraints  }) =>
                ({[property]: Object.values(constraints).join(', ')}));
            throw new ValidationException(messages);
        }

        return value;
    }

}
