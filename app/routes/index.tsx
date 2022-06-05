import { assocPath } from 'ramda';
import { useEffect } from 'react';
import { ActionFunction, Form, Link, useActionData, useTransition } from 'remix';
import { classNames } from '~/utils/class-names';
import { allWords } from '~/utils/words';

export const handle = { hydrate: true };

type RawData = Record<
  number,
  {
    chars: string;
    color?: 'green';
  }
> & {
  notAllowed: string;
};

type ActionReturnType = {
  words: string[];
  rawData: RawData;
};

export const action: ActionFunction = async ({ request }): Promise<ActionReturnType> => {
  const formData = await request.formData();
  const rawData = Array.from(formData.entries()).reduce((acc, cur) => {
    const [key, value] = cur;
    return assocPath(key.split('.'), value.toString().toLowerCase(), acc);
  }, {}) as RawData;

  const words = allWords
    .filter((word) => {
      if (rawData.notAllowed.split('').some((c: string) => word.includes(c))) return false;
      for (let index = 0; index < 5; index++) {
        const chars = rawData[index].chars || '';
        const green = rawData[index].color === 'green';
        for (const char of chars) {
          if (!word.includes(char)) return false;
          if (green && word[index] !== char) return false;
          if (!green && word[index] === char) return false;
        }
      }
      return true;
    })
    .sort((a, b) => a.localeCompare(b));

  const tooLong = words.length > 500;

  return { words: tooLong ? [...words.slice(0, 500), '…'] : words, rawData };
};

export default function Index() {
  const data = useActionData<ActionReturnType>();
  const { state } = useTransition();

  // scroll to result
  useEffect(() => {
    if (data?.words?.length) {
      const element = document.getElementById('result');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data?.words]);

  const isSubmitting = state === 'submitting';

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative mx-auto max-w-sm">
        <div className="text-center">
          <Link to="/js-disabled">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Wordle Calculator</h2>
          </Link>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Type in characters you know for specific locations and select if they are in a green or yellow box.
          </p>
        </div>
        <div className="mt-8 xs:mt-12">
          <Form method="post">
            <fieldset className="flex flex-col gap-y-6" disabled={isSubmitting}>
              <div className="flex justify-between gap-x-1.5 xxs:gap-x-3 xs:gap-x-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-1 flex-col items-end gap-1.5 xxs:gap-3">
                      <input
                        type="text"
                        name={`${i}.chars`}
                        placeholder="A-Z"
                        pattern="[A-Za-z]{0,4}"
                        maxLength={4}
                        autoCorrect="off"
                        defaultValue={data?.rawData[i]?.chars}
                        className="peer block h-10 w-full shrink-0 rounded-md border-gray-300 p-0 text-center uppercase placeholder-gray-400 shadow-sm placeholder-shown:normal-case focus:border-indigo-500 focus:ring-indigo-500 xxs:h-12"
                      />
                      <label className="relative h-10 w-full rounded-md peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-gray-200 peer-placeholder-shown:child:opacity-0 xxs:h-12">
                        <input
                          type="checkbox"
                          name={`${i}.color`}
                          value="green"
                          defaultChecked={data?.rawData[i]?.color === 'green'}
                          className="peer hidden"
                        />
                        <span className="absolute inset-0 cursor-pointer rounded-md bg-yellow-500 peer-checked:border-green-500 peer-checked:bg-green-500" />
                      </label>
                    </div>
                  ))}
              </div>
              <input
                type="text"
                name="notAllowed"
                id="notAllowed"
                autoCorrect="off"
                placeholder="Type in not allowed characters"
                defaultValue={data?.rawData.notAllowed}
                className="block w-full rounded-md border-gray-300 py-3 px-4 uppercase shadow-sm placeholder-shown:normal-case focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className={classNames(
                  'inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                )}
              >
                {isSubmitting ? 'Loading …' : 'Get Words'}
              </button>
            </fieldset>
          </Form>
        </div>
        {!!data &&
          (data.words?.length ? (
            <div className="mt-8 scroll-mt-8 xs:mt-12 xs:scroll-mt-12" id="result">
              <h3 className="text-lg font-medium text-gray-900">Possible words</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.words.map((word: string) => (
                  <div key={word} className="flex items-center uppercase">
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 xs:mt-12">
              <h3 className="text-lg font-medium text-gray-900">No words found</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
