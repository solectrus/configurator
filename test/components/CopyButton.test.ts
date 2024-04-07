import { mount } from '@vue/test-utils'
import CopyButton from '@/components/CopyButton.vue'

// Mock navigator.clipboard.writeText
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
})

describe('CopyButton', () => {
  it('displays a check mark and hides it after 2 seconds', async () => {
    const wrapper = mount(CopyButton, {
      props: {
        text: 'Testtext',
        filename: 'test.txt',
      },
    })

    // Click the button
    await wrapper.find('button[title="Copy to clipboard"]').trigger('click')

    // Is the text copied to the clipboard?
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Testtext')

    // Is the checkmark displayed?
    expect(wrapper.html()).toContain('Copied!')

    // Simulate the passage of time
    vi.runAllTimers()

    // Wait explicitly to ensure that Vue has processed the DOM changes
    vi.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    // Is the checkmark hidden?
    expect(wrapper.html()).not.toContain('Copied!')
  })

  it('allows downloading', async () => {
    const wrapper = mount(CopyButton, {
      props: {
        text: 'Testtext',
        filename: 'test.txt',
      },
    })

    global.Blob = vi.fn()
    global.URL = {
      createObjectURL: vi.fn(() => 'test-url'),
    } as any

    // Click the button
    await wrapper.find('button[title="Download as file"]').trigger('click')

    // Check if the Blob and URL.createObjectURL were called
    expect(global.Blob).toHaveBeenCalledWith(['Testtext'], { type: 'text/plain' })
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })
})
