import { assocPath } from 'ramda';
import { useEffect } from 'react';
import { ActionFunction, Form, Link, useActionData, useTransition } from 'remix';
import { classNames } from '~/utils/class-names';
import { allWords } from '~/utils/words';

// enum characterStates {
//   WRONG = 'wrong',
//   CORRECT = 'correct',
//   WRONG_POSITION = 'wrong_position',
// }

export const handle = { hydrate: true };

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Array.from(formData.entries()).reduce((acc, cur) => {
    const [key, value] = cur;
    return assocPath(key.split('.'), value.toString().toLowerCase(), acc);
  }, {}) as any;

  console.log(rawData);

  const words = allWords
    .filter((word) => {
      if (rawData.notAllowed.split('').some((c: string) => word.includes(c))) return false;
      for (let index = 0; index < 5; index++) {
        const char = rawData[index].char;
        const green = !!rawData[index].green;
        if (char) {
          if (!word.includes(char)) return false;
          if (green && word.indexOf(char) !== index) return false;
        }
      }
      return true;
    })
    .sort((a, b) => a.localeCompare(b));

  const tooLong = words.length > 500;

  return { words: tooLong ? [...words.slice(0, 500), '…'] : words, rawData };
};

export default function Index() {
  const data = useActionData();
  const { state } = useTransition();

  // Add Character
  // Input for Character, only allow characters from listOfChars
  // 5 Checkboxes to mark position where the character is not

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
            Type in characters you know and select at which places they can't be.
          </p>
        </div>
        <div className="mt-8 xs:mt-12">
          <Form method="post">
            <fieldset className="flex flex-col gap-y-6" disabled={isSubmitting}>
              <div className="flex justify-between gap-y-2 xxs:gap-x-3 xs:gap-x-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col items-end gap-1.5 xxs:gap-3">
                      <input
                        type="text"
                        name={`${i}.char`}
                        placeholder="A-Z"
                        pattern='[A-Za-z]{1}'
                        maxLength={1}
                        autoCorrect="off"
                        defaultValue={data?.rawData[i]?.char}
                        className="peer box-content block h-10 w-10 shrink-0 rounded-md border-gray-300 p-0 text-center uppercase placeholder-gray-400 shadow-sm placeholder-shown:normal-case focus:border-indigo-500 focus:ring-indigo-500 xxs:h-12 xxs:w-12"
                      />
                      <label className="rounded-md border border-white peer-placeholder-shown:pointer-events-none peer-placeholder-shown:border-gray-400 peer-placeholder-shown:child:opacity-0">
                        <input
                          type="checkbox"
                          name={`${i}.green`}
                          defaultChecked={!!data?.rawData[i]?.value}
                          className="peer hidden"
                        />
                        <span className="box-content flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-yellow-500 text-gray-400 peer-checked:border-green-500 peer-checked:bg-green-500 xxs:h-12 xxs:w-12" />
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
        {!!data?.words?.length && (
          <div className="mt-8 scroll-mt-8 xs:mt-12 xs:scroll-mt-12" id="result">
            <h3 className="text-lg font-medium text-gray-900">Possible Words</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.words.map((word: string) => (
                <div key={word} className="flex items-center uppercase">
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
