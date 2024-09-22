'use server';

import { BadRequestError, UnauthorizedError } from '@/app/utils/http/http-error';
import { isValidation } from '@/app/utils/zod/validation.util';
import { API_PATH } from '../../api-path';
import { InitUserInfoResponse, UserInfoResponse } from './user.type';
import {
  UserInfoResponseSchema,
  InitUserInfoResponseSchema,
  FindIdFormSchema,
  FindIdResponseSchema,
} from './user.validation';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { instance } from '@/app/utils/http/instance';

export async function auth(): Promise<InitUserInfoResponse | UserInfoResponse | undefined> {
  try {
    const result = await fetchUser();
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return;
    }
    throw error;
  }
}

export async function fetchUser(): Promise<InitUserInfoResponse | UserInfoResponse> {
  try {
    console.log(`${API_PATH.user}/me`);
    const { data } = await instance.get(`${API_PATH.user}/me`);

    if (isValidation(data, UserInfoResponseSchema) || isValidation(data, InitUserInfoResponseSchema)) {
      return data;
    } else {
      throw 'Invalid user info response schema.';
    }
  } catch (error) {
    throw error;
  }
}

export async function findUserToStudentNumber(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FindIdFormSchema.safeParse({
    studentNumber: formData.get('studentNumber'),
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '학번이 8글자가 맞는지 확인해주세요.',
    };
  }

  try {
    const { studentNumber } = validatedFields.data;
    const response = await fetch(`${API_PATH.user}/${studentNumber}/auth-id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (response.status === 200)
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: '',
        value: result,
      };
    else
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: result.message,
      };
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      throw error;
    }
  }
}

export async function validateUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FindIdResponseSchema.safeParse({
    authId: formData.get('authId'),
    studentNumber: formData.get('studentNumber'),
  });
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '학번이 8글자가 맞는지 확인해주세요.',
    };
  }

  try {
    const { studentNumber, authId } = validatedFields.data;

    const response = await fetch(`${API_PATH.user}/${studentNumber}/validate?auth-id=${authId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    if (result.passedUserValidation)
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: '',
        value: { authId },
      };
    else
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '해당 사용자가 존재하지 않습니다',
      };
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.message,
      };
    } else {
      throw error;
    }
  }
}
