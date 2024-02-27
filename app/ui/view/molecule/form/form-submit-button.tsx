import clsx from 'clsx';
import Button from '../../atom/button/button';

type FormSubmitButtonProps = {
  label: string;
  position?: 'left' | 'right' | 'center';
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default';
};

export function FormSubmitButton({
  label,
  position = 'right',
  variant = 'primary',
  size = 'md',
}: FormSubmitButtonProps) {
  return (
    <div
      className={clsx('flex', {
        'justify-start': position === 'left',
        'justify-center': position === 'center',
        'justify-end': position === 'right',
      })}
    >
      <Button size={size} variant={variant} type="submit" label={label} />
    </div>
  );
}
