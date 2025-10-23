import { mount } from '@vue/test-utils'
import CopyButton from '@/components/CopyButton.vue'

// Mock navigator.clipboard.writeText
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
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

    URL.createObjectURL = vi.fn(() => 'test-url')
    const originalBlob = global.Blob
    const blobMock = vi.fn()
    class MockBlob extends originalBlob {
      constructor(parts: BlobPart[], options?: BlobPropertyBag) {
        super(parts, options)
        blobMock(parts, options)
      }
    }
    vi.stubGlobal('Blob', MockBlob)

    // Click the button
    await wrapper.find('button[title="Download as file"]').trigger('click')

    // Check if the Blob and URL.createObjectURL were called
    expect(blobMock).toHaveBeenCalledWith(['Testtext'], { type: 'text/plain' })
    expect(URL.createObjectURL).toHaveBeenCalled()
  })
})
