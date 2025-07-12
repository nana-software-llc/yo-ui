import { useCallback, useEffect, useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/new-york/ui/command"
import { Label } from "@/registry/new-york/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { useTranslation } from '../hooks/use-translation'

type Option<T = string> = {
  value: T
  label: string
}

type FSelectProps<T = string> = {
  options: Option<T>[]
  placeholder?: string
  value?: T | Option<T>,
  onChange?: (value: Option<T> | T | undefined) => void
  label?: string
  request?: (keyword: string) => Promise<Option<T>[]>
  labelInValue?: boolean
  renderExtra?: () => React.ReactNode
  autoRequest?: boolean
}

export function stringToFilterString(title: string) {
  let slug;
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase().trim();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');

  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/\s\s+/g, ' ');

  return slug;
}

export function filterSelectOptions(input: string, option: { label: string }) {
  return (
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    stringToFilterString(option.label.toLowerCase()).indexOf(stringToFilterString(input).toLowerCase()) >= 0
  );
}

export function Select<T = string>({ options: optionsProp, placeholder, value: valueProp, onChange, label, labelInValue, renderExtra, request,autoRequest: autoRequestProp = true }: FSelectProps<T>) {
  const t = useTranslation()
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<T | Option<T> | undefined>(valueProp)
  const [options, setOptions] = useState<Option<T>[]>(optionsProp)
  const [keyword, setKeyword] = useState('');
  const [autoRequest, setAutoRequest] = useState(autoRequestProp);
  const [loading, setLoading] = useState<'loading' | 'success' | 'error' | 'none'>('none')

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp as T | Option<T>)
    }
  }, [valueProp])

  const debounce = (fn: (keyword: string) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (keyword: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(keyword), delay);
    };
  };

  const doRequest = async (keyword: string) => {
    if (!request || (!autoRequest && !keyword.length)) {
      return;
    }

    try {
      setLoading('loading');
      const values = await request(keyword);
      setOptions(values);
      setLoading('success');
    } catch {
      setLoading('error');
    }
  };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(doRequest, 200), []);

  useEffect(() => {
    debounceFn(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (autoRequest) {
      debounceFn(keyword);
    }
    setAutoRequest(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const repairOptions = (options: Option<T>[]): Option<T>[] => {
    if (!options || options.length === 0) return [];
    if (request) {
      return options;
    }

    return options.filter(option => filterSelectOptions(keyword, { label: option.label }));
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? options.find(
                    (option) => option.value === value
                  )?.label
                : placeholder || t("command.select.placeholder", "- Select -")}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder || t("command.select.placeholder", "- Select -")} value={keyword} onValueChange={setKeyword}/>
            <CommandList>
              {loading === 'loading' && <CommandEmpty>{t("command.select.loading", "Loading...")}</CommandEmpty>}
              {loading === 'error' && <CommandEmpty>{t("command.select.error", "Error, please try again.")}</CommandEmpty>}
              {loading === 'success' && <CommandEmpty>{t("command.select.empty", "No option found.")}</CommandEmpty>}
              {!request && <CommandEmpty>{t("command.select.empty", "No option found.")}</CommandEmpty>}

              <CommandGroup>
              {repairOptions(options).map((option, index) => (
                  <CommandItem
                    key={`${index}-${option.value}`}
                    value={`${option.value}`}
                    onSelect={(currentValue) => {
                      setOpen(false)
                      if (labelInValue) {
                        setValue({
                          label: option.label,
                          value: option.value
                        })
                        onChange?.({
                          label: option.label,
                          value: option.value
                        })
                      } else {
                        const newValue = value === `${option.value}` ? undefined : option.value;
                        console.log(`labelInValue: ${labelInValue}`, newValue, 'newValue2', currentValue, option)
                        setValue(newValue)
                        onChange?.(newValue)
                      }
                    }}
                  >
                    {option.label}
                    {`${value}` === `${option.value}` && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
              ))}
              </CommandGroup>
              <CommandSeparator />
              {typeof renderExtra === "function" && renderExtra()}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

