import {useForm} from 'react-hook-form'

import {TbTrashX as ResetIcon} from 'react-icons/tb'
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useSearchDialogStore} from '@/stores/searchDialogStore'

type FormValues = {
  input: string
}

function SearchForm({onComplected}: {onComplected?: () => void}) {
  const [, setTargetRepository] = useTargetRepository()

  const form = useForm<FormValues>({
    defaultValues: {
      input: '',
    },
  })

  const onSubmit = ({input}: FormValues) => {
    // Remove http://github.com or https://github.com or git@github.com: from the input, and remove .git or / on end
    const cleanInput = input
      .trim()
      .replace(/^(?:https?:\/\/)?(?:www\.)?(git@|github\.com)?[/:]?/i, '')
      .replace(/(\/|\?.+|\.git)$/i, '')
      .trim()

    // Validate the input field is not empty
    if (!input.trim()) {
      form.setError('input', {
        type: 'required',
        message: 'Repository URL is required',
      })
      form.setValue('input', '')
      form.setFocus('input')
      return
    }

    /**
     * Validate the input field is in the correct format
     *
     * Supports the following formats:
     * - owner/repo
     * - owner/repo@ref
     * - owner/repo/@ref
     * - owner/repo/ref
     * - owner/repo/tree/ref
     * - owner/repo/commit/ref
     */
    const regexMatch = cleanInput.match(
      /^(?<owner>[a-z0-9_-]+)\/(?<repo>[a-z0-9_-]+)(?:\/tree\/|\/commit\/|\/?@|\/)?(?<ref>[a-z0-9/_.-]+)?$/i,
    )
    if (!regexMatch || !regexMatch.groups) {
      form.setError('input', {
        type: 'invalid',
        message: 'Invalid repository URL',
      })
      form.setFocus('input')
      return
    }

    setTargetRepository(
      regexMatch.groups.owner,
      regexMatch.groups.repo,
      regexMatch.groups.ref,
    )

    form.clearErrors('input')
    form.setValue('input', '')
    if (onComplected) {
      onComplected()
    }
  }

  const onClockResetButton = () => {
    form.clearErrors('input')
    form.setValue('input', '')
    form.setFocus('input')
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent useless empty chars at start and end
    e.target.value = e.target.value.trim()

    // Remove the error message when the user starts typing
    form.clearErrors('input')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="input"
          render={({field}) => (
            <FormItem>
              <div className="flex gap-1">
                <FormControl className="flex-1">
                  <Input
                    id="input"
                    aria-label="Repository URL input"
                    className="transition-all text-xs md:text-sm placeholder:text-neutral-600"
                    placeholder="https://github.com/example/test/main"
                    {...field}
                    onInput={onInput}
                    required
                  />
                </FormControl>
                <Button
                  type="button"
                  aria-label="Reset input"
                  variant="ghost"
                  className="!px-2"
                  onClick={onClockResetButton}>
                  <ResetIcon className="size-6" />
                </Button>
              </div>
              <Button
                variant="secondary"
                type="submit"
                disabled={!form.watch('input').trim()}>
                Open
              </Button>
              <div className="min-h-5">
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function SearchDialog() {
  const {isOpen, setOpen, close} = useSearchDialogStore()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open Github Repository</DialogTitle>
          <DialogDescription>Enter the Github repository URL</DialogDescription>
        </DialogHeader>
        <SearchForm onComplected={close} />
      </DialogContent>
    </Dialog>
  )
}
