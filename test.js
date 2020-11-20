const tape = require('tape')
const fixtures = require('./fixtures')
const bint = require('./')


tape('toString methods', t => {
  for (let f of fixtures) {
    const arr = new Uint8Array(f.test)

    t.same(bint.toString(arr, 'hex'), f.hex)
    t.same(bint.toString(arr, 'base64'), f.base64)
    t.same(bint.toString(arr, 'utf-8'), f.utf8)
  }

  t.end()
})

tape('fromString methods', t => {
  for (let f of fixtures) {
    const arr = new Uint8Array(f.test)
    const from = new Uint8Array(f.utf8from)

    t.same(bint.fromString(f.hex, 'hex'), arr)
    t.same(bint.fromString(f.base64, 'base64'), arr)
    t.same(bint.fromString(f.base64, 'utf-8'), from)
  }

  t.end()
})

tape('compare', t => {
  t.equal(bint.compare(Buffer.alloc(2), Buffer.alloc(3)), -1)
  t.equal(bint.compare(Buffer.alloc(2), Buffer.alloc(2, 1)), -1)
  t.equal(bint.compare(Buffer.alloc(2, 1), Buffer.alloc(2)), 1)
  t.equal(bint.compare(Buffer.alloc(2), Buffer.alloc(2)), 0)
  t.equal(bint.compare(Buffer.alloc(4096, 0x7f), Buffer.alloc(4096, 0x7f)), 0)
  t.equal(bint.compare(Buffer.alloc(4096, 0x7f), Buffer.alloc(4096, 0x80)), -1)
  t.end()
})

tape('concat', t => {
  for (let i = 0; i < fixtures.length; i++) {
    const toConcat = fixtures.slice(0, i + 1).map(t => new Uint8Array(t.test))
    const sum = bint.concat(toConcat)
    const check = new Uint8Array(fixtures[i].sum)

    t.same(sum, check)
  }

  t.end()
})
